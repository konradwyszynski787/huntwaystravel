'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/HTP_Logo_Strona_Internetowa.png" 
            alt="HuntWays Travel Polska" 
            width={300} 
            height={90}
            priority
            className={styles.logoImage}
            style={{ objectFit: 'contain' }}
          />
        </Link>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Strona główna
          </Link>
          <Link href="/pakiety" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Pakiety
          </Link>
          <Link href="/formularz" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Formularz
          </Link>
          <Link href="/o-nas" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            O nas
          </Link>
          <Link href="/galeria" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Galeria
          </Link>
          <Link href="/opinie" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Opinie
          </Link>
        </nav>

        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

