import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function RecruitSponsors() {
    const benefits = [
        { icon: '📢', title: 'ブランド露出', description: 'イベント全体での企業ロゴ掲載' },
        { icon: '🎯', title: 'ターゲット層へのリーチ', description: '親子・ファミリー層への直接アプローチ' },
        { icon: '🤝', title: '地域貢献', description: '健康的なライフスタイルの推進に貢献' },
        { icon: '📸', title: 'SNS露出', description: '公式SNSでの継続的な露出' },
        { icon: '🎁', title: 'サンプリング機会', description: '参加者への商品・サービス体験提供' },
        { icon: '💼', title: 'CSR活動', description: '企業の社会貢献活動としてアピール' },
    ];

    const sponsors = [
        { name: 'オキナワフィットネス24', image: '/images/sponsors/fitness24.png' },
        { name: 'LIFESHIFT', image: '/images/sponsors/lifeshift.png' },
        { name: 'Kcore', image: '/images/sponsors/kcore.png' },
        { name: 'MARUTA', image: '/images/sponsors/maruta.png' },
    ];

    return (
        <div className={styles.sponsorsWrapper}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <h1 className={styles.mainTitle}>⚔️ スポンサー募集中 ⚔️</h1>
                <p className={styles.subtitle}>
                    「クエストウォーク」は、親子で挑戦する15kmの冒険。<br />
                    この特別な体験を一緒に創り上げてくださるパートナーを募集しています。
                </p>

                {/* Current Sponsors Integration */}
                <div style={{ marginTop: '3rem', maxWidth: '800px', margin: '3rem auto 0' }}>
                    <p style={{ color: '#ccc', marginBottom: '1rem', fontSize: '0.9rem' }}>現在のパートナー企業様</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        backdropFilter: 'blur(5px)'
                    }}>
                        {sponsors.map((sponsor) => (
                            <div key={sponsor.name} style={{
                                width: '120px',
                                height: '60px',
                                position: 'relative',
                                background: '#fff',
                                borderRadius: '8px',
                                padding: '10px'
                            }}>
                                <Image
                                    src={sponsor.image}
                                    alt={sponsor.name}
                                    fill
                                    style={{ objectFit: 'contain', padding: '5px' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>✨ あなたも冒険のパートナーに ✨</h2>
                    <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '2rem' }}>
                        スポンサーになることで得られる価値
                    </p>

                    <div className={styles.benefitsList}>
                        {benefits.map((benefit, index) => (
                            <div key={index} className={styles.benefitItem}>
                                <div className={styles.benefitIcon}>{benefit.icon}</div>
                                <div className={styles.benefitTitle}>{benefit.title}</div>
                                <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>{benefit.description}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <a href="mailto:info@quest-walk.com" className={styles.contactButton}>
                            スポンサーについて問い合わせる
                        </a>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                            ※ 詳細な資料をお送りします
                        </p>
                    </div>
                </section>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link href="/sponsors" style={{
                        display: 'inline-block',
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: 'rgba(255,255,255,0.1)',
                        border: '2px solid #fff',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        marginRight: '1rem'
                    }}>
                        スポンサー一覧を見る
                    </Link>

                </div>
            </div>
        </div>
    );
}
