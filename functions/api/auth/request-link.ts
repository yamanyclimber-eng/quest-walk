import type { Env } from '../../_lib/types';
import { hashToken, randomToken } from '../../_lib/crypto';
import { sendMagicLinkEmail } from '../../_lib/email';
import { errorJson, json } from '../../_lib/http';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAGIC_LINK_TTL_SECONDS = 60 * 15; // 15 minutes

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json<{ email?: string }>().catch(() => null);
  const email = body?.email?.trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return errorJson(400, 'invalid_email');
  }

  const raw = randomToken();
  const tokenHash = await hashToken(raw);

  await env.DB.prepare(
    `INSERT INTO magic_links (token_hash, email, expires_at)
     VALUES (?, ?, datetime('now', '+${MAGIC_LINK_TTL_SECONDS} seconds'))`
  )
    .bind(tokenHash, email)
    .run();

  const origin = new URL(request.url).origin;
  const verifyUrl = `${origin}/login/verify?token=${raw}`;

  await sendMagicLinkEmail(env, email, verifyUrl);

  const response: Record<string, unknown> = { ok: true };
  if (env.ENVIRONMENT === 'development') {
    response.devMagicLink = verifyUrl;
  }
  return json(response);
};
