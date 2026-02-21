'use client'

import { useState } from 'react'
import styles from './BookingForm.module.css'

interface BookingFormData {
  firstName: string
  lastName: string
  adults: string
  children: string
  email: string
  packageName: string
}

interface BookingFormProps {
  packageName: string
  onClose: () => void
}

export default function BookingForm({ packageName, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    adults: '1',
    children: '0',
    email: '',
    packageName: packageName
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (!formData.firstName.trim()) {
      errors.push('Imię jest wymagane')
    }

    if (!formData.lastName.trim()) {
      errors.push('Nazwisko jest wymagane')
    }

    if (!formData.email.trim()) {
      errors.push('Email jest wymagany')
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.push('Podaj prawidłowy adres email')
      }
    }

    if (errors.length > 0) {
      setSubmitError(errors.join(', '))
      return false
    }

    setSubmitError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/booking-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas wysyłania zapytania')
      }

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 3000)
      
    } catch (error: any) {
      console.error('Błąd podczas wysyłania formularza:', error)
      setSubmitError(error.message || 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (submitError) {
      setSubmitError(null)
    }
  }

  if (showSuccess) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.successMessage}>
            <h3>Dziękujemy!</h3>
            <p>Twoje zapytanie o wyjazd "{packageName}" zostało wysłane.</p>
            <p>Skontaktujemy się z Tobą w najbliższym czasie.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Zapisz się na wyjazd</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.modalContent}>
          <p className={styles.packageInfo}>Wyjazd: <strong>{packageName}</strong></p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <label>Imię*</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className={styles.input}
                placeholder="Wpisz swoje imię"
              />
            </div>

            <div className={styles.formRow}>
              <label>Nazwisko*</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className={styles.input}
                placeholder="Wpisz swoje nazwisko"
              />
            </div>

            <div className={styles.formRow}>
              <label>Liczba osób dorosłych*</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.adults}
                onChange={(e) => handleInputChange('adults', e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formRow}>
              <label>Liczba dzieci</label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.children}
                onChange={(e) => handleInputChange('children', e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formRow}>
              <label>Email*</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className={styles.input}
                placeholder="twój@email.com"
              />
            </div>

            {submitError && (
              <div className={styles.errorMessage}>
                {submitError}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Anuluj
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
