'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [devMagicLink, setDevMagicLink] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('sending');
        setDevMagicLink(null);

        try {
            const res = await fetch('/api/auth/request-link', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('failed');
            const data = await res.json();
            setStatus('sent');
            if (data.devMagicLink) setDevMagicLink(data.devMagicLink);
        } catch {
            setStatus('error');
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginBox}>
                <div className="rpgWindow">
                    <h1 className={styles.title}>冒険者の記録</h1>

                    {status === 'sent' ? (
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                                ログイン用のリンクをメールで送信しました。<br />
                                メールボックスをご確認ください（15分間有効）。
                            </p>
                            {devMagicLink && (
                                <p style={{ fontSize: '0.85rem', opacity: 0.85, wordBreak: 'break-all' }}>
                                    [開発用] <Link href={devMagicLink} style={{ color: '#00ffff' }}>{devMagicLink}</Link>
                                </p>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1rem', opacity: 0.9 }}>
                                メールアドレスにログイン用のリンクをお送りします。<br />
                                パスワードは不要です。
                            </p>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>▶ なまえ（メール：）</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="yusha@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.actions}>
                                <button type="submit" className={styles.loginButton} disabled={status === 'sending'}>
                                    {status === 'sending' ? '送信中...' : 'ログインリンクを送る'}
                                </button>
                                {status === 'error' && (
                                    <p style={{ textAlign: 'center', color: '#ff6b6b' }}>
                                        送信に失敗しました。もう一度お試しください。
                                    </p>
                                )}
                            </div>
                        </form>
                    )}

                    <div className={styles.footer} style={{ marginTop: '3rem', borderTop: '2px dashed rgba(255,255,255,0.2)', paddingTop: '1.5rem' }}>
                        <Link href="/guide" style={{ color: '#00ffff' }}>
                            ▶ はじめての方へ：アカウント作成のメリット
                        </Link>
                        <br /><br />
                        <Link href="/" className={styles.backLink}>
                            城（ホーム）へもどる
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
