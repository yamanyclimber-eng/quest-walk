import Link from 'next/link';
import styles from './contact.module.css';

export default function Contact() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>お問い合わせ</h1>
                <p className={styles.description}>
                    イベントに関するご質問やご相談は、<br />
                    以下のフォームよりお気軽にお問い合わせください。
                </p>

                <div className={styles.centerBox}>
                    <h2 className={styles.subTitle}>代表へのお問い合わせ</h2>
                    <p className={styles.message}>
                        Quest Walkに関するご質問、取材のご依頼、スポンサーのご相談などは、<br />
                        代表のヤマノハ ヨシローのFacebookメッセンジャーまで直接ご連絡ください。
                    </p>

                    <a
                        href="https://www.facebook.com/yoshiro.yamanoha/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.facebookButton}
                    >
                        ヤマノハ ヨシローのFBへ連絡する
                    </a>

                    <p className={styles.note}>
                        ※返信までにお時間をいただく場合がございます。<br />あらかじめご了承ください。
                    </p>
                </div>
            </div>
        </main>
    );
}
