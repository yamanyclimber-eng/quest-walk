import Link from 'next/link';
import Image from '@/components/Img';
import styles from '../page.module.css';

export default function Courses() {
    return (
        <div className={styles.page} style={{ padding: 'var(--spacing-xl) var(--spacing-md)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <main className={styles.container} style={{ width: '100%' }}>
                <h1 className={styles.sectionTitle}>コース紹介</h1>
                <p style={{ textAlign: 'center', marginBottom: '3rem' }}>体力や経験に合わせて選べる2つのコースをご用意しています。</p>

                <div style={{ display: 'grid', gap: '4rem', width: '100%', maxWidth: '900px' }}>
                    {/* Course 1: Little Dragon Course */}
                    <section style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #f0f0f0' }}>
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                            <Image
                                src="/images/courses/dragon-course.jpg"
                                alt="リトルドラゴンコース 9km"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ color: '#d4af37', margin: 0, fontSize: '1.8rem' }}>リトルドラゴンコース 9km</h2>
                                <span style={{ background: '#ff4d4d', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold' }}>NEW!!</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                                <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '2', fontSize: '1.1rem' }}>
                                    <li>📅 <strong>日程:</strong> 2/14 (土)</li>
                                    <li>📍 <strong>集合:</strong> グスクロード公園 (西側P)</li>
                                    <li>⏰ <strong>時間:</strong> 8:00集合 ▶ 12:00ゴール</li>
                                    <li>💰 <strong>参加料:</strong> ¥1,000 (5歳以下無料)</li>
                                </ul>
                                <div style={{ background: '#fff9e6', padding: '1.5rem', borderRadius: '12px', border: '1px dashed #d4af37' }}>
                                    <p style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>✨ スペシャルポイント:</p>
                                    <p style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>トカゲの森と海を冒険！海の見える休憩所 & 川遊びも楽しめます！</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Course 2: Gekizaka & Camp */}
                    <section style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #f0f0f0' }}>
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                            <Image
                                src="/images/courses/camp-course.jpg"
                                alt="激坂 6km & キャンプ！"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <div style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ color: '#1a3c22', margin: 0, fontSize: '1.8rem' }}>激坂 6km & キャンプ！</h2>
                                <span style={{ background: '#1a3c22', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold' }}>宿泊体験付</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                                <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '2', fontSize: '1.1rem' }}>
                                    <li>📅 <strong>日程:</strong> 2.28 (土)</li>
                                    <li>📍 <strong>集合:</strong> 馬天港</li>
                                    <li>⏰ <strong>時間:</strong> 8:00集合 〜 11:00ゴール</li>
                                    <li>💰 <strong>参加料:</strong> ¥1,000 (5歳以下無料)</li>
                                </ul>
                                <div style={{ background: '#e8f4ea', padding: '1.5rem', borderRadius: '12px', border: '1px dashed #1a3c22' }}>
                                    <p style={{ margin: 0, color: '#1a3c22', fontWeight: 'bold' }}>🔥 キャンプオプション:</p>
                                    <p style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>【先着5組】追加 ¥1,000でキャンプ体験！焚き火・朝食付きの特別な夜を。</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <Link href="/" className={styles.ctaButton}>
                        ホームに戻る
                    </Link>
                </div>
            </main>
        </div>
    );
}
