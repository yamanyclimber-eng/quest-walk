import Image from '@/components/Img';
import styles from './PhotoGallery.module.css';

const photos = [
  {
    src: '/images/goal-group.jpg',
    alt: 'ゴール地点でのガッツポーズ集合写真',
  },
  {
    src: '/images/emu-feeding.jpg',
    alt: 'エミューに餌をあげる体験',
  },
  {
    src: '/images/bridge-view-kids.jpg',
    alt: '高い橋から景色を眺める子供たち',
  },
  {
    src: '/images/low-angle-kids.jpg',
    alt: '空を見上げる子供たちのローアングルショット',
  },
  {
    src: '/images/scenic-observation.jpg',
    alt: '手すり越しに広大な景色を観察',
  },
  {
    src: '/images/view-group.jpg',
    alt: '展望台からの景色を楽しむ参加者',
  },
  {
    src: '/images/ladybug-girl.jpg',
    alt: 'てんとう虫を見つける女の子',
  },
  {
    src: '/images/landscape-pano.jpg',
    alt: '山から見下ろす街並み',
  },
  {
    src: '/images/emu-observation.jpg',
    alt: 'エミューを観察する子供たち',
  },
  {
    src: '/images/middle-point.jpg',
    alt: '中間地点での集合写真',
  },
  {
    src: '/images/hiking-trail.png',
    alt: '木漏れ日のある美しい山道',
  },
  {
    src: '/images/parent-child.png',
    alt: '手をつないで歩く親子',
  },
  {
    src: '/images/mountain-view.png',
    alt: '山頂からの絶景',
  },
  {
    src: '/images/ladybug-hand.jpg',
    alt: '手に止まるてんとう虫',
  },
];

export default function PhotoGallery() {
  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>ギャラリー</h2>
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
