import Link from 'next/link';
import styles from './faqs.module.css';

export default function FAQs() {
    const faqs = [
        {
            question: "子供だけで参加できますか？",
            answer: "いいえ、原則として保護者の方の同伴をお願いしております。親子で絆を深めることを目的としたイベントですので、ぜひご一緒に挑戦してください。"
        },
        {
            question: "雨天の場合は開催されますか？",
            answer: "小雨決行ですが、台風などの荒天時は中止となる場合があります。中止の場合は、前日までに公式サイトおよび公式SNSでお知らせいたします。"
        },
        {
            question: "コースの難易度はどのくらいですか？",
            answer: "15kmの道のりには山道も含まれますが、小学校低学年のお子様でも完歩できるレベルに設定されています。ただし、普段運動をされていない方は事前の準備をお勧めします。"
        },
        {
            question: "途中でリタイアすることはできますか？",
            answer: "はい、各チェックポイントにスタッフが待機しておりますので、体調が悪くなった場合などは無理せずお申し出ください。サポート車でゴール地点まで送迎いたします。"
        },
        {
            question: "参加費はいくらですか？",
            answer: "現在はプレ開催期間中のため、特別料金でご案内しております。詳細はお申し込みページをご確認ください。"
        },
        {
            question: "服装や持ち物について教えてください。",
            answer: "動きやすい服装と歩き慣れた運動靴でご参加ください。持ち物は、飲み物、タオル、着替え、雨具などを推奨しております。"
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
