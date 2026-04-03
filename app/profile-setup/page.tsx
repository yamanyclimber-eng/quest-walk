'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PartyMember {
    id: number;
    nickname: string;
    birthDate: string;
    gender: string;
}

export default function ProfileSetupPage() {
    const router = useRouter();

    const [profile, setProfile] = useState({
        nickname: '',
        birthDate: '',
        address: ''
    });

    const [party, setParty] = useState<PartyMember[]>([
        { id: Date.now(), nickname: '', birthDate: '', gender: 'none' }
    ]);

    const addPartyMember = () => {
        setParty([...party, { id: Date.now(), nickname: '', birthDate: '', gender: 'none' }]);
    };

    const removePartyMember = (id: number) => {
        if (party.length > 1) {
            setParty(party.filter(member => member.id !== id));
        }
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePartyChange = (id: number, field: keyof PartyMember, value: string) => {
        setParty(party.map(member =>
            member.id === id ? { ...member, [field]: value } : member
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('王国の名簿に登録されました！');
        router.push('/register'); // Redirect to registration page
    };

    return (
        <div className={styles.setupWrapper}>
            <div className={styles.setupBox}>
                <h1 className={styles.title}>冒険者名簿への登録</h1>

                <div className="rpgWindow">
                    <form onSubmit={handleSubmit}>
                        {/* User Info Section */}
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>▶ 勇者本人の情報</h2>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>ニックネーム</label>
                                <input
                                    name="nickname"
                                    value={profile.nickname}
                                    onChange={handleProfileChange}
                                    className={styles.input}
                                    placeholder="旅での名前を決めてください"
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>生年月日</label>
                                    <input
                                        name="birthDate"
                                        type="date"
                                        value={profile.birthDate}
                                        onChange={handleProfileChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>住所（都道府県・市区町村）</label>
                                    <input
                                        name="address"
                                        value={profile.address}
                                        onChange={handleProfileChange}
                                        className={styles.input}
                                        placeholder="例：東京都渋谷区"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Party / Family Section */}
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>▶ パーティメンバー（家族）</h2>
                            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                一緒に冒険に出るご家族の情報を登録してください。
                            </p>

                            <div className={styles.partyList}>
                                {party.map((member, index) => (
                                    <div key={member.id} className={styles.partyCard}>
                                        <div className={styles.cardHeader}>
                                            <span>メンバー {index + 1}</span>
                                            {party.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePartyMember(member.id)}
                                                    className={styles.removeButton}
                                                >
                                                    はずす
                                                </button>
                                            )}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem' }}>
                                            <div className={styles.formGroup}>
                                                <label className={styles.label}>ニックネーム</label>
                                                <input
                                                    value={member.nickname}
                                                    onChange={(e) => handlePartyChange(member.id, 'nickname', e.target.value)}
                                                    className={styles.input}
                                                    placeholder="なまえ"
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.label}>生年月日</label>
                                                <input
                                                    type="date"
                                                    value={member.birthDate}
                                                    onChange={(e) => handlePartyChange(member.id, 'birthDate', e.target.value)}
                                                    className={styles.input}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.label}>性別</label>
                                                <select
                                                    value={member.gender}
                                                    onChange={(e) => handlePartyChange(member.id, 'gender', e.target.value)}
                                                    className={styles.select}
                                                >
                                                    <option value="none">選択</option>
                                                    <option value="male">男</option>
                                                    <option value="female">女</option>
                                                    <option value="other">その他</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addPartyMember}
                                className={styles.addButton}
                            >
                                ＋ パーティメンバーを加える
                            </button>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            この情報で冒険者登録を完了する！
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link href="/" style={{ color: '#fff', textDecoration: 'underline', fontSize: '0.9rem' }}>
                            あとで登録する（ホームへ）
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
