'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function GuidePage() {
    return (
        <div className={styles.guideWrapper}>
            <div className={styles.guideBox}>
                <h1 className={styles.title}>クエストウォークへようこそ</h1>

                <div className="rpgWindow">
                    <div className={styles.content}>
                        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            「クエストウォーク」の世界へようこそ！<br />
                            アカウントを発行（ログイン）することで、あなたの旅はより快適になります。
                        </p>

                        <div className={styles.section}>
                            <h2 className={styles.benefitTitle}>申し込みが驚くほど簡単に</h2>
                            <p>
                                一度ログインすれば、あなたの「勇者のなまえ」や「連絡用ハト（メールアドレス）」がギルドに登録されます。
                                次回からの申し込みフォームでは、これらの情報が自動的に入力された状態になり、スムーズにクエストを受注できます。
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2 className={styles.benefitTitle}>冒険の記録を保存</h2>
                            <p>
                                過去に参加したイベントの記録や、獲得した称号（準備中）をいつでも確認できるようになります。
                                親子の絆の軌跡を、いつでも振り返ることが可能です。
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2 className={styles.benefitTitle}>家族も一緒に「パーティ」登録</h2>
                            <p>
                                ご家族の情報を「パーティ」として登録しておくことで、お子様連れでの参加申し込みもワンクリックで完了するように。
                                大切な仲間全員の情報をギルドが管理します。
                            </p>
                        </div>

                        <div className={styles.footer}>
                            <p style={{ marginBottom: '1rem', color: '#666' }}>※現在アカウント機能は準備中です</p>
                            <button
                                onClick={() => alert('現在アカウント機能は準備中です！近日公開までお待ちください。')}
                                className={styles.ctaButton}
                                style={{ backgroundColor: '#DB4437', marginBottom: '1rem', opacity: 0.7 }}
                            >
                                Googleで　冒険を始める（準備中）
                            </button>
                            <Link href="/" className={styles.backLink}>
                                城（ホーム）へもどる
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
