import styles from './VideoGallery.module.css';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

const videos = [
    {
        src: `${base}/videos/v1.mp4`,
        poster: `${base}/images/thumbnails/v1_thumb.jpg`,
        title: '冒険の始まり',
        type: 'video/mp4'
    },
    {
        src: `${base}/videos/v2_fixed.mp4`,
        poster: `${base}/images/thumbnails/v2_thumb.jpg`,
        title: '森の中へ',
        type: 'video/mp4'
    },
    {
        src: `${base}/videos/v3.mp4`,
        poster: `${base}/images/thumbnails/v3_thumb.jpg`,
        title: '頂上を目指して',
        type: 'video/mp4'
    },
];

export default function VideoGallery() {
    return (
        <section className={styles.gallery}>
            <h2 className={styles.title}>冒険の様子 (動画)</h2>
            <div className={styles.grid}>
                {videos.map((video, index) => (
                    <div key={index} className={styles.videoWrapper}>
                        <video
                            className={styles.video}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={video.poster}
                        >
                            <source src={video.src} type={video.type} />
                            お使いのブラウザは動画タグをサポートしていません。
                        </video>
                    </div>
                ))}
            </div>
        </section>
    );
}
