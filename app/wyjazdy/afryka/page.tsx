'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BookingForm from '../../components/BookingForm'
import styles from './page.module.css'

const africaPackages = [
  {
    id: 1,
    title: 'Perły Afryki',
    destination: 'Uganda, Tanzania, Kenya, Rwanda',
    date: 'Data indywidualna',
    duration: 'Długość wyjazdu indywidualna',
    price: 'Cena indywidualna',
    currency: '',
    image: '/Perly_afryki.jpeg',
    description: 'Zapraszamy na wyjazdy do Afryki we współpracy z lokalnym touroperatorem Mandela Safari! Jest to legalnie zarejestrowany w Ugandzie i Holandii organizator wypraw po Afryce z bogatym doświadczeniem. Wyjazdy obejmują takie miejsca jak: Uganda czyli nieodkryta perła Afryki w której są specjalistami. Kenia, piękne rezerwaty przyrody oraz dzika natura. Tanzania, czyli cudowna natura, kilimanjaro oraz piękne plaże Zanzibaru. Rwanda czyli nieodkryte miejsce Afryki oferujące cudowne widoki oraz niezapomniane wrażenia. Afryka czeka nie ciebie więc ty nie czekaj i skontaktuj się z nami po idealną ofertę skonstruowaną pod ciebie lub twoją grupę!',
    includes: ['Noclegi', 'Loty', 'Przewodnik', 'Transport na miejscu']
  }
]

export default function AfricaPackagesPage() {
  const [showBookingForm, setShowBookingForm] = useState<string | null>(null)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <button className={styles.backButton} onClick={() => window.location.href = '/wyjazdy'}>
            ← Wróć
          </button>
          <h1 className={styles.title}>Wyjazdy zorganizowane Afryka</h1>
          <p className={styles.subtitle}>
            Niezapomniane safari i przygoda w sercu Afryki. Współpraca z lokalnym touroperatorem Mandela Safari.
          </p>
          
          <div className={styles.packagesGrid}>
            {africaPackages.map((pkg) => (
              <div key={pkg.id} className={styles.packageCard}>
                <div className={styles.packageImage}>
                  <img src={pkg.image} alt={pkg.title} />
                  <div className={styles.packageBadge}>
                    <span>{pkg.date}</span>
                  </div>
                  <div className={styles.packageBadge} style={{ top: '55px' }}>
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                <div className={styles.packageContent}>
                  <h3 className={styles.packageTitle}>{pkg.title}</h3>
                  <p className={styles.packageDestination}>{pkg.destination}</p>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                  
                  <div className={styles.packageIncludes}>
                    <h4>Pakiet zawiera:</h4>
                    <ul>
                      {pkg.includes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.packageFooter}>
                    <div className={styles.packagePrice}>
                      <span className={styles.priceAmount}>{pkg.price}</span>
                      <span className={styles.priceCurrency}>{pkg.currency}</span>
                    </div>
                    <button className={styles.contactButton} onClick={() => setShowBookingForm(pkg.title)}>
                      Zapisz się
                    </button>
                    <button className={styles.contactButton}>
                      Szczegóły w PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      
      {showBookingForm && (
        <BookingForm 
          packageName={showBookingForm} 
          onClose={() => setShowBookingForm(null)} 
        />
      )}
    </>
  )
}
