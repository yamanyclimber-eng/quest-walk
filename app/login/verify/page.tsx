'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/Providers';
import styles from '../page.module.css';

function VerifyInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refresh } = useAuth();
    const [status, setStatus] = useState<'checking' | 'error'>('checking');

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('error');
            return;
        }

        (async () => {
            try {
                const res = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ token }),
                });
                if (!res.ok) throw new Error('invalid');
                const data = await res.json();
                await refresh();
                router.replace(data.hasProfile ? '/register' : '/profile-setup');
            } catch {
                setStatus('error');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (status === 'error') {
        return (
            <div className={styles.loginWrapper}>
                <div className={styles.loginBox}>
                    <div className="rpgWindow">
                        <h1 className={styles.title}>認証エラー</h1>
                        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            リンクの有効期限が切れているか、無効なリンクです。
                        </p>
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/login" className={styles.backLink}>
                                もう一度ログインする
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginBox}>
                <div className="rpgWindow">
                    <h1 className={styles.title}>認証中...</h1>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<p style={{ textAlign: 'center', padding: '4rem' }}>認証中...</p>}>
            <VerifyInner />
        </Suspense>
    );
}
