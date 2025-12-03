import Header from './components/Header'
import Footer from './components/Footer'
import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {/* <h1 className={styles.heroTitle}>Huntways Travel</h1> */}
            <div className={styles.heroTitle}> <Image 
            src="/HTP_Logo_Strona_Internetowa.png" 
            alt="HuntWays Travel Polska" 
            width={300} 
            height={90}
            priority
            className={styles.logoImage}
            style={{ objectFit: 'contain' }}
          />
          </div>
            <h3 className={styles.heroSubtitle}>
              Odkrywaj świat na własnych warunkach
            </h3>
          </div>
          
          {/* Quick Navigation Tiles */}
          <div className={styles.heroTiles}>
            <a href="#jak-to-dziala-formularz" className={styles.heroTile}>
              <div className={styles.tileIcon}>📝</div>
              <h3>Formularz</h3>
              <p>Zaplanuj podróż</p>
            </a>
            <a href="#jak-to-dziala-pakiety" className={styles.heroTile}>
              <div className={styles.tileIcon}>🎒</div>
              <h3>Pakiety</h3>
              <p>Gotowe wycieczki</p>
            </a>
            <Link href="/o-nas" className={styles.heroTile}>
              <div className={styles.tileIcon}>ℹ️</div>
              <h3>O nas</h3>
              <p>Poznaj nas</p>
            </Link>
            <Link href="/opinie" className={styles.heroTile}>
              <div className={styles.tileIcon}>⭐</div>
              <h3>Opinie</h3>
              <p>Co mówią klienci</p>
            </Link>
          </div>
        </section>

        {/* How It Works - Formularz */}
        <section id="jak-to-dziala-formularz" className={`section ${styles.howItWorks}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Jak to działa?</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Wypełnij formularz</h3>
                <p>Podaj nam podstawowe informacje o swojej podróży</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Wybierz preferencje</h3>
                <p>Określ swoje preferencje dotyczące lotu i hotelu</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Otrzymaj ofertę</h3>
                <p>Skontaktujemy się z Tobą z najlepszą ofertą</p>
              </div>
            </div>
            <div className={styles.ctaSection}>
              <Link href="/formularz" className={styles.ctaButton}>
                Zacznij planowanie
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works - Pakiety */}
        <section id="jak-to-dziala-pakiety" className={`section ${styles.howItWorksPackages}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Gotowe pakiety i wycieczki</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Przeglądaj pakiety</h3>
                <p>Zobacz naszą szeroką ofertę gotowych wycieczek i pakietów</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Wybierz wycieczkę</h3>
                <p>Znajdź idealną podróż dopasowaną do Twoich potrzeb</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Zarezerwuj teraz</h3>
                <p>Zarezerwuj swoją wycieczkę lub pakiet</p>
              </div>
            </div>
            <div className={styles.ctaSection}>
              <Link href="/pakiety" className={styles.ctaButton}>
                Zacznij teraz
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        {/* <section className={`section ${styles.galleryPreview}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Nasze podróże</h2>
            <p className={styles.sectionSubtitle}>
              Zobacz zdjęcia z podróży naszych klientów
            </p>
            <Link href="/galeria" className={styles.galleryLink}>
              Zobacz galerię →
            </Link>
          </div>
        </section> */}

        
      </main>
      <Footer />
    </>
  )
}

