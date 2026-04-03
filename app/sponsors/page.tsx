import Link from 'next/link';
import Image from '@/components/Img';
import styles from './page.module.css';

export default function Sponsors() {
    const sponsors = {
        gold: [
            {
                name: 'オキナワフィットネス24',
                image: '/images/sponsors/fitness24.png',
                description: '最高品質のハイキング用具を提供し、参加者の安全をサポートします。',
                contribution: '全参加者に専用トレッキングポールを提供'
            },
            {
                name: 'LIFESHIFT',
                image: '/images/sponsors/lifeshift.png',
                description: '持続可能なイベント運営のための公式ハイドレーションパートナーです。',
                contribution: 'エコボトルと給水ステーションを設置'
            },
        ],
        silver: [
            {
                name: 'Kcore',
                image: '/images/sponsors/kcore.png',
                description: '全参加者に新鮮な軽食とエネルギーを提供します。',
                contribution: 'チェックポイントでの栄養補給サポート'
            },
            {
                name: 'MARUTA',
                image: '/images/sponsors/maruta.png',
                description: 'イベントの模様をリアルタイムで放送し、地域を盛り上げます。',
                contribution: 'イベント記録動画の制作・配信'
            },
        ],
    };



    return (
        <div className={styles.sponsorsWrapper}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>⚔️ パートナー企業 ⚔️</h1>
                <p className={styles.subtitle}>
                    「クエストウォーク」を応援してくださるパートナー企業の皆様です。<br />
                    心より感謝申し上げます。
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <Link href="/sponsors/recruit" className={styles.contactButton} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                        スポンサーになる方法はこちら
                    </Link>
                </div>
            </div>

            <div className={styles.container}>
                {/* Gold Sponsors */}
                <section className={styles.tierSection}>
                    <div className={styles.tierHeader} style={{ borderColor: '#FFD700' }}>
                        <span className={styles.tierBadge}>👑</span>
                        <h2 className={styles.tierTitle} style={{ color: '#FFD700' }}>ゴールドスポンサー</h2>
                    </div>
                    <div className={styles.tierGrid}>
                        {sponsors.gold.map((sponsor) => (
                            <div key={sponsor.name} className={styles.sponsorCard}>
                                <div className={styles.logoContainer}>
                                    <Image
                                        src={sponsor.image}
                                        alt={sponsor.name}
                                        fill
                                        style={{ objectFit: 'contain', padding: '10px' }}
                                    />
                                </div>
                                <h3 className={styles.sponsorName}>{sponsor.name}</h3>
                                <p className={styles.sponsorDescription}>{sponsor.description}</p>
                                <div style={{
                                    background: '#fff3cd',
                                    padding: '12px',
                                    borderLeft: '4px solid #FFD700',
                                    fontSize: '0.95rem',
                                    color: '#856404'
                                }}>
                                    <strong>🎁 貢献内容:</strong> {sponsor.contribution}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Silver Sponsors */}
                <section className={styles.tierSection}>
                    <div className={styles.tierHeader} style={{ borderColor: '#C0C0C0' }}>
                        <span className={styles.tierBadge}>🥈</span>
                        <h2 className={styles.tierTitle} style={{ color: '#C0C0C0' }}>シルバースポンサー</h2>
                    </div>
                    <div className={styles.tierGrid}>
                        {sponsors.silver.map((sponsor) => (
                            <div key={sponsor.name} className={styles.sponsorCard}>
                                <div className={styles.logoContainer}>
                                    <Image
                                        src={sponsor.image}
                                        alt={sponsor.name}
                                        fill
                                        style={{ objectFit: 'contain', padding: '10px' }}
                                    />
                                </div>
                                <h3 className={styles.sponsorName}>{sponsor.name}</h3>
                                <p className={styles.sponsorDescription}>{sponsor.description}</p>
                                <div style={{
                                    background: '#e2e3e5',
                                    padding: '12px',
                                    borderLeft: '4px solid #C0C0C0',
                                    fontSize: '0.95rem',
                                    color: '#383d41'
                                }}>
                                    <strong>🎁 貢献内容:</strong> {sponsor.contribution}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}


                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link href="/" style={{
                        display: 'inline-block',
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: 'rgba(255,255,255,0.1)',
                        border: '2px solid #fff',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                    }}>
                        ← ホームに戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
