import Link from 'next/link';
import styles from './page.module.css';
import PhotoGallery from '@/components/PhotoGallery';
import VideoGallery from '@/components/VideoGallery';
import NextQuest from '@/components/NextQuest';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <video
          className={styles.videoBackground}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/thumbnails/hero_thumb.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>クエストウォーク</h1>
          <p className={styles.heroSubtitle}>
            親子で歩く15kmの旅。<br />
            自然の中で共に汗を流し、絆を深める特別な一日を。
          </p>
          <Link href="/register" className={styles.ctaButton}>
            イベントに参加する
          </Link>
        </div>
      </section>

      {/* About / Concept Section */}
      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>イベントについて</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            「クエストウォーク」は、親子で挑戦する15kmの山道ウォーキングイベントです。
            普段の生活では味わえない達成感と、親子の対話を生み出します。
          </p>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>15kmの挑戦</h3>
              <p>平坦な道だけではありません。山道を歩き抜くことで、子供たちの自信とたくましさを育みます。</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>親子の絆</h3>
              <p>長い道のりを共に歩く中で、普段は話せないことや、お互いの新たな一面を発見できます。</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>自然体験</h3>
              <p>四季折々の自然を感じながら、心身ともにリフレッシュできる特別な時間です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <PhotoGallery />

      {/* Video Gallery Section */}
      <VideoGallery />

      {/* Next Quest Section */}
      <NextQuest />

      {/* Registration Section */}
      <section id="registration" className={`${styles.section} ${styles.registration}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} style={{ color: 'white' }}>参加申し込み</h2>
          <p className={styles.registrationText}>
            参加ご希望の方は、以下のフォームよりご連絡ください。
          </p>
          {/* Placeholder for future form or external link */}
          <Link href="/register" className={styles.ctaButton}>
            申し込みフォームへ
          </Link>
        </div>
      </section>
    </main>
  )
}
