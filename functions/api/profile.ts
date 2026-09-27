import type { Env } from '../_lib/types';
import { errorJson, json } from '../_lib/http';
import { getSessionUser } from '../_lib/session';

interface PartyMemberInput {
  nickname: string;
  birthDate: string;
  gender: string;
}

interface ProfileBody {
  nickname?: string;
  birthDate?: string;
  address?: string;
  partyMembers?: PartyMemberInput[];
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const user = await getSessionUser(request, env);
  if (!user) return errorJson(401, 'unauthorized');

  const body = await request.json<ProfileBody>().catch(() => null);
  if (!body?.nickname || !body?.birthDate || !body?.address) {
    return errorJson(400, 'missing_fields');
  }
  const partyMembers = Array.isArray(body.partyMembers) ? body.partyMembers : [];

  const profile = await env.DB.prepare(
    `INSERT INTO profiles (id, user_id, nickname, birth_date, address, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET
       nickname = excluded.nickname,
       birth_date = excluded.birth_date,
       address = excluded.address,
       updated_at = datetime('now')
     RETURNING id`
  )
    .bind(crypto.randomUUID(), user.id, body.nickname, body.birthDate, body.address)
    .first<{ id: string }>();

  if (!profile) return errorJson(500, 'profile_save_failed');

  const statements = [
    env.DB.prepare(`DELETE FROM party_members WHERE profile_id = ?`).bind(profile.id),
    ...partyMembers.map((member) =>
      env.DB.prepare(
        `INSERT INTO party_members (id, profile_id, nickname, birth_date, gender) VALUES (?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), profile.id, member.nickname, member.birthDate, member.gender)
    ),
  ];
  await env.DB.batch(statements);

  return json({ ok: true });
};
