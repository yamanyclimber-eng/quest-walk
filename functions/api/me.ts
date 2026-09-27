import type { Env } from '../_lib/types';
import { json } from '../_lib/http';
import { getSessionUser } from '../_lib/session';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const user = await getSessionUser(request, env);
  if (!user) return json({ authenticated: false });

  const profile = await env.DB.prepare(`SELECT nickname FROM profiles WHERE user_id = ?`)
    .bind(user.id)
    .first<{ nickname: string }>();

  return json({
    authenticated: true,
    user: { id: user.id, email: user.email, nickname: profile?.nickname ?? null },
    hasProfile: Boolean(profile),
  });
};
