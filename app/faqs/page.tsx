import Link from 'next/link';
import styles from './faqs.module.css';

export default function FAQs() {
    const faqs = [
        {
            question: "子供だけで参加できますか？",
            answer: "はい、できます！親子での参加も、お子さまだけをお預けいただくのもOKです。3歳から参加できます。"
        },
        {
            question: "雨天の場合は開催されますか？",
            answer: "雨天決行です。台風などの悪天候の場合は中止します。中止の場合は公式Instagram（@quest.walk）でお知らせします。"
        },
        {
            question: "コースの難易度はどのくらいですか？",
            answer: "コースは6〜17km、5〜6時間ほどかけて歩きます。山道も含まれ、大人でもなかなかきつい道のりですが、休憩をこまめに取りながら進みます。"
        },
        {
            question: "途中でリタイアすることはできますか？",
            answer: "はい、各チェックポイントにスタッフが待機しておりますので、体調が悪くなった場合などは無理せずお申し出ください。サポート車でゴール地点まで送迎いたします。"
        },
        {
            question: "参加費はいくらですか？",
            answer: "1人¥1,000（傷害保険含む）です。5歳以下は無料です。"
        },
        {
            question: "服装や持ち物について教えてください。",
            answer: "速乾性の長袖と運動靴がおすすめです（スリッパ・クロックスは不可）。持ち物は、水筒、帽子、行動食（おにぎりなど）、雨具（カッパかポンチョ。傘は不可）、タオル、着替え、保険証（コピー可）です。準備は前日の夜までに済ませておきましょう！"
        }
    ];

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>よくある質問</h1>
                <p className={styles.description}>
                    イベントに関するよくあるご質問をまとめました。<br />
                    その他ご不明な点がございましたら、お気軽にお問い合わせください。
                </p>

                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles.faqItem}>
                            <h3 className={styles.question}>
                                <span className={styles.qIcon}>Q</span>
                                {faq.question}
                            </h3>
                            <p className={styles.answer}>
                                <span className={styles.aIcon}>A</span>
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={styles.backButtonWrapper}>
                    <Link href="/" className={styles.backButton}>ホームに戻る</Link>
                </div>
            </div>
        </main>
    );
}
