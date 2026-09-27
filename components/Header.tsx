'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/Img';
import { useAuth } from '@/components/Providers';
import styles from './Header.module.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading, logout } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoWrapper}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="/images/logos/quest-walk-banner.jpg"
                            alt="クエストウォーク"
                            width={200}
                            height={50}
                            className={styles.logoImage}
                            priority
                        />
                    </div>
                </Link>

                {/* Hamburger Menu Button */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="メニュー"
                >
                    <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
                    <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
                    <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
                </button>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
                    <Link href="/guide" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>初めての方へ</Link>
                    <Link href="/ranking" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>ランキング</Link>
                    <Link href="/sponsors" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>スポンサー</Link>
                    <Link href="/courses" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>コース種類</Link>
                    {!loading && user ? (
                        <>
                            <span className={`${styles.navLink} ${styles.userStatus}`} title={user.nickname ?? user.email}>
                                {user.nickname ?? user.email} さん
                            </span>
                            <button
                                type="button"
                                className={styles.navLink}
                                style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer' }}
                                onClick={() => {
                                    logout();
                                    setMobileMenuOpen(false);
                                }}
                            >
                                ログアウト
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>ログイン</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
