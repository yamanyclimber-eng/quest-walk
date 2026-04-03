'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    <Link href="/login" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>ログイン(準備中)</Link>
                </nav>
            </div>
        </header>
    );
}
