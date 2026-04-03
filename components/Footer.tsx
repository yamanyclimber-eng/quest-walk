import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* サイトマップ */}
                    <div>
                        <h3 className={styles.columnTitle}>サイトマップ</h3>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><Link href="/" className={styles.link}>ホーム</Link></li>
                            <li className={styles.linkItem}><Link href="/guide" className={styles.link}>初めての方へ</Link></li>
                            <li className={styles.linkItem}><Link href="/ranking" className={styles.link}>ランキング</Link></li>
                            <li className={styles.linkItem}><Link href="/courses" className={styles.link}>コース種類</Link></li>
                        </ul>
                    </div>

                    {/* インフォメーション */}
                    <div>
                        <h3 className={styles.columnTitle}>インフォメーション</h3>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><Link href="/sponsors" className={styles.link}>スポンサー募集</Link></li>
                            <li className={styles.linkItem}><Link href="/faqs" className={styles.link}>よくある質問</Link></li>
                            <li className={styles.linkItem}><Link href="/contact" className={styles.link}>お問い合わせ</Link></li>
                            <li className={styles.linkItem}><Link href="/privacy" className={styles.link}>プライバシーポリシー</Link></li>
                        </ul>
                    </div>

                    {/* ソーシャル & 公式 */}
                    <div>
                        <h3 className={styles.columnTitle}>公式アカウント</h3>
                        <div className={styles.socialIcons}>
                            {/* アイコンはテキストで代用しますが、FontAwesomeなどが一般的です */}
                            <a href="#" className={styles.socialIcon} aria-label="Twitter">X</a>
                            <a href="#" className={styles.socialIcon} aria-label="Instagram">IG</a>
                            <span className={styles.socialIcon} style={{ opacity: 0.5, cursor: 'not-allowed' }} aria-label="LINE(準備中)">LN</span>
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
                            ※LINEは現在準備中です
                        </p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                            最新イベント情報を配信中！
                        </p>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>&copy; {new Date().getFullYear()} Quest Walk. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
