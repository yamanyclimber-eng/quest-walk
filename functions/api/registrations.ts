import type { Env } from '../_lib/types';
import { errorJson, json } from '../_lib/http';
import { getSessionUser } from '../_lib/session';

interface RegistrationBody {
  eventDate?: string;
  participantCount?: number;
  message?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const user = await getSessionUser(request, env);
  if (!user) return errorJson(401, 'unauthorized');

  const hasProfile = await env.DB.prepare(`SELECT 1 FROM profiles WHERE user_id = ?`)
    .bind(user.id)
    .first();
  if (!hasProfile) return errorJson(409, 'profile_required');

  const body = await request.json<RegistrationBody>().catch(() => null);
  const participantCount = Number(body?.participantCount);
  if (!body?.eventDate || !Number.isFinite(participantCount) || participantCount < 1) {
    return errorJson(400, 'missing_fields');
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO registrations (id, user_id, event_date, participant_count, message)
     VALUES (?, ?, ?, ?, ?)`
  )
    .bind(id, user.id, body.eventDate, participantCount, body.message ?? null)
    .run();

  return json({ ok: true, registrationId: id });
};
