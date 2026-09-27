import type { Env } from '../../_lib/types';
import { json } from '../../_lib/http';
import { clearSessionCookieHeader, destroySession } from '../../_lib/session';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  await destroySession(request, env);
  return json({ ok: true }, { headers: { 'set-cookie': clearSessionCookieHeader() } });
};
