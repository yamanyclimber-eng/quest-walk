'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useAuth } from '@/components/Providers';
import { NEXT_EVENT_DATE, NEXT_EVENT_LABEL } from '@/lib/nextEvent';

export default function RegisterPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [formData, setFormData] = useState({
        participants: '2',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        }
    }, [authLoading, user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch('/api/registrations', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    eventDate: NEXT_EVENT_DATE,
                    participantCount: Number(formData.participants),
                    message: formData.message,
                }),
            });
            if (res.status === 401) {
                router.replace('/login');
                return;
            }
            if (res.status === 409) {
                router.replace('/profile-setup');
                return;
            }
            if (!res.ok) throw new Error('failed');
            setDone(true);
        } catch {
            setError('申し込みに失敗しました。もう一度お試しください。');
        } finally {
            setSubmitting(false);
        }
    }

    if (authLoading || !user) {
        return null;
    }

    return (
        <div className={styles.registerWrapper}>
            <div className={styles.formBox}>
                <h1 className={styles.title}>クエスト受注（参加申し込み）</h1>

                <div className="rpgWindow">
                    {done ? (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#ffff00' }}>
                                クエストを受注しました！
                            </p>
                            <p>担当より追ってご連絡いたします。当日を楽しみにお待ちください。</p>
                        </div>
                    ) : (
                        <>
                            <p style={{ marginBottom: '2rem', borderBottom: '2px solid #fff', paddingBottom: '1rem' }}>
                                旅の手続きを行います。必要事項を記入してください。
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>▶ 連絡用のハト（メールアドレス）</label>
                                    <input
                                        value={user.email}
                                        className={styles.input}
                                        disabled
                                        style={{ opacity: 0.7 }}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>▶ 開催日</label>
                                    <input value={NEXT_EVENT_LABEL} className={styles.input} disabled style={{ opacity: 0.7 }} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>▶ パーティの人数</label>
                                    <select
                                        name="participants"
                                        value={formData.participants}
                                        onChange={handleChange}
                                        className={styles.input}
                                        style={{ appearance: 'none' }}
                                    >
                                        <option value="2">2人（親子1組）</option>
                                        <option value="3">3人</option>
                                        <option value="4">4人以上</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>▶ ギルドマスターへの伝言（備考）</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        placeholder="意気込みや質問などがあれば記入してください"
                                    />
                                </div>

                                {error && (
                                    <p style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>
                                )}

                                <button type="submit" className={styles.submitButton} disabled={submitting}>
                                    {submitting ? '送信中...' : 'このクエストを引き受ける！'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
