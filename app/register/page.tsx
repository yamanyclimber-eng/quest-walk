'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        participants: '2',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.registerWrapper}>
            <div className={styles.formBox}>
                <h1 className={styles.title}>クエスト受注（参加申し込み）</h1>


                <div className="rpgWindow">
                    <p style={{ marginBottom: '2rem', borderBottom: '2px solid #fff', paddingBottom: '1rem' }}>
                        旅の手続きを行います。必要事項を記入してください。
                    </p>

                    <form onSubmit={(e) => { e.preventDefault(); alert('クエストを受注しました！（デモ）'); }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>▶ 勇者のなまえ</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="なまえを入力してください"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>▶ 連絡用のハト（メールアドレス）</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>▶ パーティの人数</label>
                            <select
                                name="participants"
                                value={formData.participants}
                                onChange={handleChange}
                                className={styles.input}
                                style={{ appearance: 'none' }}
                            >
                                <option value="2">2人（親子1組）</option>
                                <option value="3">3人</option>
                                <option value="4">4人以上</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>▶ ギルドマスターへの伝言（備考）</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={styles.textarea}
                                placeholder="意気込みや質問などがあれば記入してください"
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            このクエストを引き受ける！
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
