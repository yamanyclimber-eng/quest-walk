import type { Env } from './types';

export async function sendMagicLinkEmail(env: Env, to: string, url: string): Promise<void> {
  if (env.ENVIRONMENT === 'development') {
    console.log(`[dev] magic link for ${to}: ${url}`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Quest Walk <onboarding@resend.dev>',
      to,
      subject: 'クエストウォーク ログインリンク',
      html: `<p>以下のリンクをクリックしてログインしてください（15分間有効）。</p><p><a href="${url}">${url}</a></p><p>心当たりがない場合はこのメールを無視してください。</p>`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}
