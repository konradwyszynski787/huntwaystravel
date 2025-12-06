'use client'

import { useState } from 'react'
import Link from 'next/link'
import Newsletter from './Newsletter'
import styles from './Footer.module.css'

export default function Footer() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [contactMessage, setContactMessage] = useState('')

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus('error')
      setContactMessage('Proszę wypełnić wszystkie pola')
      return
    }

    try {
      // Tutaj można dodać endpoint do wysyłki formularza kontaktowego
      // Na razie tylko symulacja
      setContactStatus('success')
      setContactMessage('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.')
      setContactForm({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setContactStatus('idle')
        setContactMessage('')
      }, 3000)
    } catch (error: any) {
      setContactStatus('error')
      setContactMessage('Wystąpił błąd. Spróbuj ponownie.')
    }
  }

  return (
    <footer className={styles.footer}>
      {/* Contact Form Section */}
      <div className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactFormWrapper}>
            <h3 className={styles.contactTitle}>Skontaktuj się z nami</h3>
            <form onSubmit={handleContactSubmit} className={styles.contactForm}>
              <div className={styles.contactFormRow}>
                <div className={styles.contactFormField}>
                  <label htmlFor="contact-name">Imię i nazwisko</label>
                  <input
                    type="text"
                    id="contact-name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={styles.contactInput}
                    required
                  />
                </div>
                <div className={styles.contactFormField}>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className={styles.contactInput}
                    required
                  />
                </div>
              </div>
              <div className={styles.contactFormField}>
                <label htmlFor="contact-message">Wiadomość</label>
                <textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={4}
                  className={styles.contactTextarea}
                  required
                />
              </div>
              {contactMessage && (
                <p className={`${styles.contactMessage} ${styles[contactStatus]}`}>
                  {contactMessage}
                </p>
              )}
              <div className={styles.contactFormActions}>
                <button type="submit" className={styles.contactButton}>
                  Wyślij wiadomość
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className={styles.footerInfo}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.section}>
              <h3 className={styles.title}>Huntways Travel</h3>
              <p className={styles.description}>
                Twój kreator wymarzonych podróży. Planujemy, rezerwujemy, realizujemy.
              </p>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Nawigacja</h4>
              <nav className={styles.footerNav}>
                <Link href="/" className={styles.footerLink}>Strona główna</Link>
                <Link href="/pakiety" className={styles.footerLink}>Pakiety</Link>
                <Link href="/formularz" className={styles.footerLink}>Formularz</Link>
                <Link href="/o-nas" className={styles.footerLink}>O nas</Link>
                <Link href="/opinie" className={styles.footerLink}>Opinie</Link>
              </nav>
            </div>
          </div>

          <div className={styles.bottom}>
            <p>&copy; {new Date().getFullYear()} Huntways Travel. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

