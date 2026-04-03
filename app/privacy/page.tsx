import Link from 'next/link';
import styles from './privacy.module.css';

export default function Privacy() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>プライバシーポリシー</h1>
                <div className={styles.content}>
                    <p className={styles.lead}>
                        Quest Walk（以下、「当イベント」といいます）は、参加者の皆様の個人情報の重要性を認識し、その保護を徹底するために、以下のプライバシーポリシーを定めます。
                    </p>

                    <section className={styles.section}>
                        <h2 className={styles.heading}>1. 個人情報の収集と利用</h2>
                        <p>
                            当イベントへの参加申し込み時やお問い合わせ時に、お名前、メールアドレス、電話番号などの個人情報をご提供いただく場合があります。<br />
                            これらの情報は、イベントの運営、連絡、安全管理、およびこれらに付随する業務のためにのみ利用いたします。
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.heading}>2. 写真・動画の撮影および利用について</h2>
                        <p className={styles.important}>
                            イベント当日は、記録および広報活動のために、スタッフが写真や動画の撮影を行います。<br />
                            撮影された写真や動画は、当イベントの公式サイト、SNS（Instagram, X, Facebook等）、ポスター、パンフレットなどの広報媒体に掲載される場合があります。<br />
                            参加申し込みを完了された時点で、これに同意したものとみなします。
                        </p>
                        <p>
                            なお、掲載に支障がある場合は、当日スタッフにお申し出いただくか、事前にお問い合わせフォームよりご相談ください。
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.heading}>3. 個人情報の第三者提供</h2>
                        <p>
                            当イベントは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。ただし、イベント中の事故等による緊急時には、医療機関や警察等に必要な情報を提供する場合があります。
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.heading}>4. 個人情報の管理</h2>
                        <p>
                            ご提供いただいた個人情報は、不正アクセス、紛失、改ざん、漏洩などがないよう、適切な安全対策を講じて管理いたします。
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.heading}>5. お問い合わせ</h2>
                        <p>
                            本ポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
                        </p>
                    </section>
                </div>

                <div className={styles.backButtonWrapper}>
                    <Link href="/" className={styles.backButton}>ホームに戻る</Link>
                </div>
            </div>
        </main>
    );
}
