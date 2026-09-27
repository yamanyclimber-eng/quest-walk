import type { Env } from '../../_lib/types';
import { hashToken } from '../../_lib/crypto';
import { errorJson, json } from '../../_lib/http';
import { createSession, sessionSetCookieHeader } from '../../_lib/session';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<{ token?: string }>().catch(() => null);
  const token = body?.token;
  if (!token) return errorJson(400, 'invalid_or_expired');

  const tokenHash = await hashToken(token);

  const link = await env.DB.prepare(
    `SELECT email FROM magic_links
     WHERE token_hash = ? AND used_at IS NULL AND expires_at > datetime('now')`
  )
    .bind(tokenHash)
    .first<{ email: string }>();

  if (!link) return errorJson(400, 'invalid_or_expired');

  await env.DB.prepare(`UPDATE magic_links SET used_at = datetime('now') WHERE token_hash = ?`)
    .bind(tokenHash)
    .run();

  await env.DB.prepare(`INSERT OR IGNORE INTO users (id, email) VALUES (?, ?)`)
    .bind(crypto.randomUUID(), link.email)
    .run();

  const user = await env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
    .bind(link.email)
    .first<{ id: string }>();

  if (!user) return errorJson(500, 'user_lookup_failed');

  const hasProfile = await env.DB.prepare(`SELECT 1 FROM profiles WHERE user_id = ?`)
    .bind(user.id)
    .first();

  const sessionToken = await createSession(env, user.id);

  return json(
    { ok: true, hasProfile: Boolean(hasProfile) },
    { headers: { 'set-cookie': sessionSetCookieHeader(sessionToken) } }
  );
};
