import type { Env } from './types';
import { hashToken, randomToken } from './crypto';

export const SESSION_COOKIE = 'qw_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface SessionUser {
  id: string;
  email: string;
}

export function parseCookies(request: Request): Record<string, string> {
  const header = request.headers.get('cookie');
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

export async function getSessionUser(request: Request, env: Env): Promise<SessionUser | null> {
  const cookies = parseCookies(request);
  const raw = cookies[SESSION_COOKIE];
  if (!raw) return null;

  const tokenHash = await hashToken(raw);
  const row = await env.DB.prepare(
    `SELECT users.id as id, users.email as email
     FROM sessions
     JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = ? AND sessions.expires_at > datetime('now')`
  )
    .bind(tokenHash)
    .first<SessionUser>();

  return row ?? null;
}

export async function createSession(env: Env, userId: string): Promise<string> {
  const raw = randomToken();
  const tokenHash = await hashToken(raw);
  await env.DB.prepare(
    `INSERT INTO sessions (token_hash, user_id, expires_at)
     VALUES (?, ?, datetime('now', '+${SESSION_TTL_SECONDS} seconds'))`
  )
    .bind(tokenHash, userId)
    .run();
  return raw;
}

export async function destroySession(request: Request, env: Env): Promise<void> {
  const cookies = parseCookies(request);
  const raw = cookies[SESSION_COOKIE];
  if (!raw) return;
  const tokenHash = await hashToken(raw);
  await env.DB.prepare(`DELETE FROM sessions WHERE token_hash = ?`).bind(tokenHash).run();
}

export function sessionSetCookieHeader(raw: string): string {
  return `${SESSION_COOKIE}=${encodeURIComponent(raw)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}
