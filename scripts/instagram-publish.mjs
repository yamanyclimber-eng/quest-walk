#!/usr/bin/env node
// Instagram 予約投稿スクリプト
//
// instagram/posts/*.md のうち status: scheduled かつ publish_at を過ぎたものを
// Instagram API（Facebook ページ経由の方式）で投稿し、ファイルを status: published に書き換える。
// 写真（images:）はサイト上のURLを Instagram に取り込ませ、
// リール（video:）は instagram/videos/ のファイルを Instagram に直接アップロードする
// （Cloudflare Pages は1ファイル25MBまでのため、動画はサイトに置かない）。
// GitHub Actions (.github/workflows/instagram-publish.yml) から30分おきに実行される。
//
// 使い方:
//   node scripts/instagram-publish.mjs           # 投稿する（IG_ACCESS_TOKEN が必要）
//   node scripts/instagram-publish.mjs --check   # 全予約ファイルの形式チェックだけ（投稿しない）

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = path.join(ROOT, 'instagram', 'posts');
const IMAGES_DIR = path.join(ROOT, 'public', 'instagram');
const VIDEOS_DIR = path.join(ROOT, 'instagram', 'videos');

const SITE_URL = (process.env.SITE_URL || 'https://quest-walk.pages.dev').replace(/\/$/, '');
const API_VERSION = process.env.IG_API_VERSION || 'v26.0';
const API = `https://graph.facebook.com/${API_VERSION}`;
// IG_ACCESS_TOKEN は Facebook ページのアクセストークン（期限なし）。そのページにリンクされた Instagram に投稿する
const TOKEN = process.env.IG_ACCESS_TOKEN;
const CHECK_ONLY = process.argv.includes('--check');
const MAX_PER_RUN = 3;

const MAX_CAPTION = 2200;
const MAX_HASHTAGS = 30;
const MAX_IMAGES = 10;
const MAX_VIDEO_BYTES = 300 * 1024 * 1024;

// ---- frontmatter ----------------------------------------------------------

// key: value と「  - 項目」のリストだけを扱う簡易パーサー
function parsePost(text) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) throw new Error('先頭に --- で囲んだ設定ブロックがありません');
    const meta = {};
    let listKey = null;
    for (const line of m[1].split(/\r?\n/)) {
        if (!line.trim() || line.trim().startsWith('#')) continue;
        const item = line.match(/^\s+-\s+(.+)$/);
        if (item && listKey) {
            meta[listKey].push(unquote(item[1]));
            continue;
        }
        const kv = line.match(/^([a-z_]+):\s*(.*)$/);
        if (!kv) throw new Error(`読めない行があります: ${line}`);
        const [, key, value] = kv;
        if (value === '') {
            meta[key] = [];
            listKey = key;
        } else {
            meta[key] = unquote(value);
            listKey = null;
        }
    }
    return { meta, caption: m[2].trim() };
}

function unquote(v) {
    v = v.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
    return v;
}

function setMeta(text, updates) {
    const m = text.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
    let block = m[2];
    for (const [key, value] of Object.entries(updates)) {
        const line = `${key}: ${value}`;
        const re = new RegExp(`^${key}:.*$`, 'm');
        block = re.test(block) ? block.replace(re, line) : `${block}\n${line}`;
    }
    return m[1] + block + m[3] + text.slice(m[0].length);
}

// publish_at は日本時間として扱う（例: 2026-11-05 19:00）
function parseJst(value) {
    const m = String(value).match(/^(\d{4}-\d{2}-\d{2})[ T](\d{1,2}):(\d{2})$/);
    if (!m) throw new Error(`publish_at の形式が違います（例: 2026-11-05 19:00）: ${value}`);
    return new Date(`${m[1]}T${m[2].padStart(2, '0')}:${m[3]}:00+09:00`);
}

// ---- validation -----------------------------------------------------------

async function validate(meta, caption) {
    const errors = [];
    try { parseJst(meta.publish_at); } catch (e) { errors.push(e.message); }

    const images = Array.isArray(meta.images) ? meta.images : [];
    if (meta.video) {
        if (images.length) errors.push('images と video はどちらか一方だけにしてください');
        if (!/\.(mp4|mov)$/i.test(meta.video)) errors.push(`リールは MP4 か MOV にしてください: ${meta.video}`);
        try {
            const { size } = await stat(path.join(VIDEOS_DIR, meta.video));
            if (size > MAX_VIDEO_BYTES) errors.push(`動画が300MBを超えています: ${meta.video}`);
        } catch {
            errors.push(`動画が見つかりません: instagram/videos/${meta.video}`);
        }
        if (meta.cover && !/\.jpe?g$/i.test(meta.cover)) errors.push(`カバー画像は JPEG にしてください: ${meta.cover}`);
        if (meta.cover) {
            try { await stat(path.join(IMAGES_DIR, meta.cover)); } catch { errors.push(`カバー画像が見つかりません: public/instagram/${meta.cover}`); }
        }
    } else if (images.length === 0) {
        errors.push('images か video のどちらかが必要です（Instagram は文章だけでは投稿できません）');
    }
    if (images.length > MAX_IMAGES) errors.push(`画像は最大${MAX_IMAGES}枚です（今: ${images.length}枚）`);
    for (const img of images) {
        if (!/\.jpe?g$/i.test(img)) errors.push(`JPEG 以外は投稿できません: ${img}`);
        try { await stat(path.join(IMAGES_DIR, img)); } catch { errors.push(`画像が見つかりません: public/instagram/${img}`); }
    }

    if (meta.type === 'story') {
        // ストーリーは本文を付けられない。写真1枚か動画1本だけ
        if (caption) errors.push('ストーリーには本文を付けられません（--- の下は空にしてください）');
        if (images.length > 1) errors.push('ストーリーは画像1枚だけです');
    } else if (!caption) {
        errors.push('本文（キャプション）が空です');
    }
    if ([...caption].length > MAX_CAPTION) errors.push(`本文が${MAX_CAPTION}文字を超えています（今: ${[...caption].length}文字）`);
    const tags = caption.match(/#[^\s#]+/g) || [];
    if (tags.length > MAX_HASHTAGS) errors.push(`ハッシュタグは最大${MAX_HASHTAGS}個です（今: ${tags.length}個）`);
    return errors;
}

// ---- Instagram API --------------------------------------------------------

async function api(method, endpoint, params = {}) {
    const url = new URL(`${API}/${endpoint}`);
    const body = new URLSearchParams({ ...params, access_token: TOKEN });
    let res;
    if (method === 'GET') {
        for (const [k, v] of body) url.searchParams.set(k, v);
        res = await fetch(url);
    } else {
        res = await fetch(url, { method, body });
    }
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.error) {
        throw new Error(`Instagram API エラー (${endpoint}): ${json.error?.message || res.status}`);
    }
    return json;
}

async function waitUntilReady(containerId, tries = 20) {
    for (let i = 0; i < tries; i++) {
        const { status_code } = await api('GET', containerId, { fields: 'status_code' });
        if (status_code === 'FINISHED') return;
        if (status_code === 'ERROR' || status_code === 'EXPIRED') {
            throw new Error(`Instagram 側の取り込みに失敗しました (status: ${status_code})`);
        }
        await new Promise((r) => setTimeout(r, 5000));
    }
    throw new Error('Instagram 側の取り込みが時間内に終わりませんでした');
}

async function imageIsLive(url) {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok && (res.headers.get('content-type') || '').includes('image/jpeg');
}

async function publishReel(userId, videoFile, coverUrl, caption) {
    const params = { media_type: 'REELS', upload_type: 'resumable', share_to_feed: 'true', caption };
    if (coverUrl) params.cover_url = coverUrl;
    const { id: creationId } = await api('POST', `${userId}/media`, params);

    await uploadVideo(creationId, videoFile);
    await waitUntilReady(creationId, 120); // 動画の処理は数分かかることがある（最大10分待つ）
    return finishPublish(userId, creationId);
}

async function uploadVideo(creationId, videoFile) {
    const data = await readFile(path.join(VIDEOS_DIR, videoFile));
    const res = await fetch(`https://rupload.facebook.com/ig-api-upload/${API_VERSION}/${creationId}`, {
        method: 'POST',
        headers: { Authorization: `OAuth ${TOKEN}`, offset: '0', file_size: String(data.length) },
        body: data,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) {
        throw new Error(`動画のアップロードに失敗しました: ${json.debug_info?.message || json.error?.message || res.status}`);
    }
}

async function finishPublish(userId, creationId) {
    const { id: mediaId } = await api('POST', `${userId}/media_publish`, { creation_id: creationId });
    // 投稿はもう済んでいるので、URL が取れなくても失敗扱いにしない
    const { permalink } = await api('GET', mediaId, { fields: 'permalink' }).catch(() => ({ permalink: '' }));
    return { mediaId, permalink };
}

async function publishStory(userId, imageUrl, videoFile) {
    let creationId;
    if (videoFile) {
        ({ id: creationId } = await api('POST', `${userId}/media`, { media_type: 'STORIES', upload_type: 'resumable' }));
        await uploadVideo(creationId, videoFile);
        await waitUntilReady(creationId, 120);
    } else {
        ({ id: creationId } = await api('POST', `${userId}/media`, { media_type: 'STORIES', image_url: imageUrl }));
        await waitUntilReady(creationId);
    }
    return finishPublish(userId, creationId);
}

async function publishImages(userId, imageUrls, caption) {
    let creationId;
    if (imageUrls.length === 1) {
        ({ id: creationId } = await api('POST', `${userId}/media`, { image_url: imageUrls[0], caption }));
    } else {
        const children = [];
        for (const image_url of imageUrls) {
            const { id } = await api('POST', `${userId}/media`, { image_url, is_carousel_item: 'true' });
            children.push(id);
        }
        for (const id of children) await waitUntilReady(id);
        ({ id: creationId } = await api('POST', `${userId}/media`, {
            media_type: 'CAROUSEL',
            children: children.join(','),
            caption,
        }));
    }
    await waitUntilReady(creationId);
    return finishPublish(userId, creationId);
}

async function igAccount() {
    const { instagram_business_account: ig } = await api('GET', 'me', { fields: 'instagram_business_account{id,username}' });
    if (!ig) throw new Error('トークンの Facebook ページに Instagram アカウントがリンクされていません');
    return ig;
}

// ---- main -----------------------------------------------------------------

async function main() {
    const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md') && !f.startsWith('_')).sort();
    const now = new Date();
    const due = [];
    let hasErrors = false;

    for (const file of files) {
        const full = path.join(POSTS_DIR, file);
        const text = await readFile(full, 'utf8');
        let parsed;
        try {
            parsed = parsePost(text);
        } catch (e) {
            console.error(`✗ ${file}: ${e.message}`);
            hasErrors = true;
            continue;
        }
        const { meta, caption } = parsed;
        if (meta.status !== 'scheduled') continue;

        const errors = await validate(meta, caption);
        if (errors.length) {
            hasErrors = true;
            console.error(`✗ ${file}`);
            for (const e of errors) console.error(`    - ${e}`);
            continue;
        }
        const at = parseJst(meta.publish_at);
        if (CHECK_ONLY) {
            const kind = meta.type === 'story'
                ? `ストーリー ${meta.video || meta.images[0]}`
                : meta.video ? `リール ${meta.video}` : `画像${meta.images.length}枚`;
            console.log(`✓ ${file}  →  ${meta.publish_at}（日本時間）に投稿予定 / ${kind}`);
        } else if (at <= now) {
            due.push({ file, full, text, meta, caption });
        }
    }

    if (CHECK_ONLY) {
        if (hasErrors) process.exit(1);
        console.log('チェック完了');
        return;
    }

    if (due.length === 0) {
        console.log('投稿時刻になった予約はありません');
        // 手動実行（Run workflow）のときは、トークンで Instagram につながるかだけ確認する
        if (TOKEN && process.env.GITHUB_EVENT_NAME === 'workflow_dispatch') {
            const { username } = await igAccount();
            console.log(`接続確認OK: @${username} に投稿できる状態です`);
        }
        if (hasErrors) process.exit(1);
        return;
    }
    if (!TOKEN) throw new Error('IG_ACCESS_TOKEN が設定されていません');

    const { id: userId, username } = await igAccount();
    console.log(`@${username} に投稿します`);

    for (const post of due.slice(0, MAX_PER_RUN)) {
        const { meta } = post;
        const toUrl = (img) => `${SITE_URL}/instagram/${img.split('/').map(encodeURIComponent).join('/')}`;
        const imageUrls = meta.video ? (meta.cover ? [toUrl(meta.cover)] : []) : meta.images.map(toUrl);

        // サイトへのデプロイが終わる前だと画像URLが404になるので、次の回に回す
        const live = await Promise.all(imageUrls.map(imageIsLive));
        if (live.includes(false)) {
            console.log(`… ${post.file}: 画像がまだサイトに公開されていないため次回に回します`);
            continue;
        }

        try {
            const { mediaId, permalink } = meta.type === 'story'
                ? await publishStory(userId, imageUrls[0], meta.video)
                : meta.video
                ? await publishReel(userId, meta.video, imageUrls[0], post.caption)
                : await publishImages(userId, imageUrls, post.caption);
            await writeFile(post.full, setMeta(post.text, {
                status: 'published',
                published_at: new Date().toISOString(),
                media_id: mediaId,
                permalink,
            }));
            console.log(`✓ ${post.file}: 投稿しました ${permalink}`);
        } catch (e) {
            // 同じ投稿を何度も試さないよう error にしておく（直したら scheduled に戻せば再投稿される）
            await writeFile(post.full, setMeta(post.text, { status: 'error', error: JSON.stringify(e.message) }));
            console.error(`✗ ${post.file}: ${e.message}`);
            hasErrors = true;
        }
    }
    if (hasErrors) process.exit(1);
}

main().catch((e) => {
    console.error(e.message);
    process.exit(1);
});
