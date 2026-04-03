import Link from 'next/link';
import styles from './NextQuest.module.css';

export default function NextQuest() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.titleWrapper}>
                    <span className={styles.subLabel}>NEXT CHAPTER</span>
                    <h2 className={styles.mainTitle}>次回の冒険：<br />龍神山脈の秘宝を探せ</h2>
                </div>

                <div className={styles.questCard}>
                    <div className={styles.infoGroup}>
                        <div className={styles.infoLabel}>開催日</div>
                        <div className={styles.infoValue}>2026.04.15</div>
                    </div>
                    <div className={styles.infoGroup}>
                        <div className={styles.infoLabel}>場所</div>
                        <div className={styles.infoValue}>高尾山エリア</div>
                    </div>
                    <div className={styles.infoGroup}>
                        <div className={styles.infoLabel}>距離</div>
                        <div className={styles.infoValue}>15km / 30km</div>
                    </div>
                    <div className={styles.infoGroup}>
                        <div className={styles.infoLabel}>難易度</div>
                        <div className={`${styles.infoValue} ${styles.difficulty}`}>★★★☆☆</div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link href="/courses" className={styles.buttonSecondary}>
                        クエスト詳細を見る
                    </Link>
                    <Link href="/register" className={styles.buttonPrimary}>
                        今すぐ参加する
                    </Link>
                </div>
            </div>
        </section>
    );
}
