import Link from 'next/link';
import styles from '../page.module.css';

export default function Ranking() {
  const rankings = [
    { rank: 1, team: '山入端ファミリー（嘉朗, 千乃）', time: '2:45:12', category: '親子' },
    { rank: 2, team: '井上ファミリー（真吾, 耀一朗, 蒼涼）', time: '2:58:30', category: '親子' },
    { rank: 3, team: '嶺井ファミリー（政哉, 政那）', time: '3:05:15', category: '親子' },
    { rank: 4, team: '東恩納ファミリー（究, 麻未, 小花, 小葉）', time: '3:12:45', category: '親子' },
    { rank: 5, team: '宜保ファミリー（淳, 日毬, 銀志朗）', time: '3:20:10', category: '親子' },
    { rank: 6, team: '津波ファミリー（香菜, 瑳梛斗, 詠奈）', time: '3:25:50', category: '親子' },
    { rank: 7, team: '城間ファミリー（奏子, 彩音, 葉音）', time: '3:35:15', category: '親子' },
    { rank: 8, team: '上原ファミリー（けいすけ, みく, ゆの, いちのすけ）', time: '3:42:20', category: '親子' },
    { rank: 9, team: '伊集ファミリー（沙弥香, 陽真李）', time: '3:55:00', category: '親子' },
    { rank: 10, team: '外間・池間グループ', time: '4:10:25', category: '親子' },
  ];

  return (
    <div className={styles.page} style={{ padding: 'var(--spacing-xl) var(--spacing-md)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000' }}>
      <main className={styles.container} style={{ width: '100%' }}>
        <h1 className={`${styles.sectionTitle} pixelText`} style={{ color: 'white', textShadow: '2px 2px 0 #000' }}>冒険の記録（ランキング）</h1>
        <p className="pixelText" style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>これまでの冒険で、特に目覚ましい活躍を見せた勇者たちだ！</p>

        <div className="rpgWindow" style={{ overflowX: 'auto', maxWidth: '900px', margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid white' }}>
                <th className="pixelText" style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>順位</th>
                <th className="pixelText" style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>勇者の名前（ファミリー）</th>
                <th className="pixelText" style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>記録</th>
                <th className="pixelText" style={{ padding: '1rem', textAlign: 'left', color: 'white' }}>属性</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((r) => (
                <tr key={r.rank} style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
                  <td className="pixelText" style={{ padding: '1rem', fontWeight: 'bold' }}>{r.rank}</td>
                  <td className="pixelText" style={{ padding: '1rem' }}>{r.team}</td>
                  <td className="pixelText" style={{ padding: '1rem' }}>{r.time}</td>
                  <td className="pixelText" style={{ padding: '1rem' }}>{r.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/" className={styles.ctaButton}>
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
