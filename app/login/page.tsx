'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginBox}>
                <div className="rpgWindow">
                    <h1 className={styles.title}>冒険者の記録</h1>

                    <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#ffff00' }}>
                        はじめての方・アカウントをお持ちでない方
                    </p>

                    <div className={styles.actions} style={{ marginBottom: '3rem' }}>
                        <button
                            type="button"
                            onClick={() => alert('現在アカウント機能は準備中です！近日公開までお待ちください。')}
                            className={styles.loginButton}
                            style={{ backgroundColor: '#DB4437', borderColor: '#fff' }}
                        >
                            Googleで　冒険を始める（準備中）
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.8 }}>
                            ※Googleアカウントで簡単に冒険者登録ができます
                        </p>
                    </div>

                    <div style={{ textAlign: 'center', margin: '2rem 0', opacity: 0.3 }}>--------------------------------</div>

                    <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1rem', opacity: 0.8 }}>
                        すでにじゅもんをお持ちの方（メールログイン）
                    </p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>▶ なまえ（メール：）</label>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="yusha@example.com"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>▶ じゅもん（パスワード：）</label>
                            <input
                                type="password"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.actions}>
                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled
                                style={{ opacity: 0.5, cursor: 'not-allowed' }}
                            >
                                冒険を再開する（準備中）
                            </button>
                            <p className={styles.forgotPassword}>
                                じゅもんを　おもいだせない方はこちら（準備中）
                            </p>
                        </div>
                    </form>

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
