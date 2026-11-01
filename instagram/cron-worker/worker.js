// Instagram 予約投稿の「見回り役」（Cloudflare Worker）
//
// GitHub の定期実行（cron）は混雑で数時間遅れることがあるので、
// 時間に正確な Cloudflare の Cron Trigger で5分おきに予約ファイルを確認し、
// 投稿時刻を過ぎた予約があれば GitHub Actions の「Instagram 自動投稿」を起動する。
// 実際の投稿は今までどおり scripts/instagram-publish.mjs が行う。
//
// 必要な設定（Cloudflare のダッシュボード）
// - シークレット GITHUB_TOKEN: リポジトリの Contents: Read と Actions: Read and write を持つ
//   GitHub の fine-grained トークン
// - Cron Trigger: */5 * * * *

const OWNER = 'yamanyclimber-eng';
const REPO = 'quest-walk';
const WORKFLOW = 'instagram-publish.yml';
const POSTS_DIR = 'instagram/posts';

async function github(env, path, init = {}) {
    const res = await fetch(`https://api.github.com/${path}`, {
        ...init,
        headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'quest-walk-cron',
            ...init.headers,
        },
    });
    if (!res.ok) throw new Error(`GitHub API エラー (${path}): ${res.status} ${await res.text()}`);
    return res;
}

// 予約ファイルを1回の問い合わせでまとめて読む
async function readPosts(env) {
    const query = `query { repository(owner: "${OWNER}", name: "${REPO}") {
        object(expression: "main:${POSTS_DIR}") { ... on Tree { entries { name object { ... on Blob { text } } } } }
    } }`;
    const res = await github(env, 'graphql', { method: 'POST', body: JSON.stringify({ query }) });
    const json = await res.json();
    if (json.errors) throw new Error(`GitHub API エラー: ${JSON.stringify(json.errors)}`);
    return (json.data.repository.object?.entries ?? [])
        .filter((e) => e.name.endsWith('.md') && !e.name.startsWith('_'))
        .map((e) => ({ name: e.name, text: e.object?.text ?? '' }));
}

function frontmatterValue(text, key) {
    const block = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const line = block.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
    return line ? line[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

// publish_at は日本時間（例: 2026-11-05 19:00）
function parseJst(value) {
    const m = String(value).match(/^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}):(\d{2})$/);
    return m ? new Date(`${m[1]}T${m[2].padStart(2, '0')}:${m[3]}:00+09:00`) : null;
}

// 投稿処理がすでに動いている（または順番待ちの）ときは重ねて起動しない
async function workflowBusy(env) {
    for (const status of ['in_progress', 'queued']) {
        const res = await github(env, `repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/runs?status=${status}&per_page=1`);
        if ((await res.json()).total_count > 0) return true;
    }
    return false;
}

async function check(env) {
    const now = new Date();
    const due = (await readPosts(env)).filter((p) => {
        if (frontmatterValue(p.text, 'status') !== 'scheduled') return false;
        const at = parseJst(frontmatterValue(p.text, 'publish_at'));
        return at && at <= now;
    });
    if (due.length === 0) return '投稿時刻を過ぎた予約はありません';
    const names = due.map((p) => p.name).join(', ');
    if (await workflowBusy(env)) return `投稿処理が実行中なので待ちます: ${names}`;
    await github(env, `repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
        method: 'POST',
        body: JSON.stringify({ ref: 'main' }),
    });
    return `投稿処理を起動しました: ${names}`;
}

export default {
    async scheduled(event, env, ctx) {
        console.log(await check(env));
    },
    // ブラウザで Worker の URL を開くと、その場で見回りを1回行う（動作確認用）
    async fetch(request, env) {
        try {
            return new Response(await check(env), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
        } catch (e) {
            return new Response(e.message, { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
        }
    },
};
