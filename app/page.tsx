import Header from './components/Header'
import Footer from './components/Footer'
import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'
import { FileText, Briefcase, Info, Star } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div>
          <div className={styles.heroContent}>
            {/* <h1 className={styles.heroTitle}>Huntways Travel</h1> */}
            <div className={styles.heroTitle}> <Image 
            src="/HTP Logo Strona Internetowa v2.png" 
            alt="Huntways Travel Polska" 
            width={400} 
            height={110}
            priority
            className={styles.logoImage}
            style={{ objectFit: 'contain' }}
          />
          <h3 className={styles.heroSubtitle}>
              My Planujemy. Ty Podróżujesz
            </h3>
          </div>
            <h3 className={styles.heroSubtitle}>
              Indywidualne planowanie podróży i doradztwo turystyczne.
              <br />
              Dla osób, które wybierają spokój i profesjonalizm.
            </h3>
          </div>
          
          {/* Quick Navigation Tiles */}
            <div className={styles.ctaSection}>
              <Link href="/formularz" className={styles.heroButton}>
                Zamów plan podróży
              </Link>
            </div>
</div>
            <div className={styles.ctaSection}>
              <Link href="/formularz" className={styles.contactButton}>
                Nie Wiesz od czego zacząć? Umów krótką konsultację
              </Link>
            </div>
        </section>
<section className={styles.backgroundImage}>
        {/* How It Works - Formularz */}
        <section id="jak-to-dziala-formularz" className={`section ${styles.howItWorks}`}>
          <div className="container" style={{padding: '7em 0 10em'}}>
            <h2 className={styles.sectionTitle}>Jak to działa?</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Wybierz pakiet</h3>
                <p>Decydujesz, który plan najlepiej pasuje do Twojej podróży oraz ciebie.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Zapłać</h3>
                <p>Szybka, wygodna i bezpieczna płatność online.</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Wypełnij formularz</h3>
                <p>Podajesz szczegóły, na podstawie których przygotowujemy plan.</p>
              </div>
            </div>
            <div className={styles.ctaSection}>
              <Link href="/formularz" className={styles.ctaButton}>
                Zamów plan podróży
              </Link>
            </div>
          </div>
           <h4 className={styles.sectionNote}>Nie jesteśmy biurem podróży.
            <br/> Świadczymy usługi planowania i doradcze.
           </h4>
        </section>

        {/* How It Works - Pakiety */}
        <section id="jak-to-dziala-pakiety" className={`section ${styles.howItWorksPackages}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Co jeszcze oferujemy?</h2>
            <h4 className={styles.sectionSubtitle}>Jeśli szukasz czegoś innego niż indywidualny plan, mamy dla ciebie wybór pozostałych usług</h4>
          </div>
           <div className={styles.heroTiles}>      
            <Link href="/ebooki" className={styles.heroTile}>
            {/* <div className={styles.tileIcon}><Info size={64} /></div> */}
            <div className={styles.tileContent}>
              <div className={styles.tileIcon}><FileText size={64} /></div>
              <h2>EBOOKI I PORADNIKI</h2>
              <h4>Dla osób, które wolą zaplanować wyjazd samodzielnie, ale chcą sprawdzonych informacji sprawdzonych informacji</h4>
              <br/> 
              <h4> - gotowe trasy i wskazówki</h4>
              <h4> - praktyczne informacje</h4>
              <h4> - konkretne kierunki</h4>
            </div>
            <div>
              <p> Produkty cyfrowe - Natychmiastowy dostęp</p>
            </div>
            </Link>
            <Link href="/formularz" className={`${styles.heroTile} ${styles.lightText}`}>
              <div className={`${styles.tileContent} ${styles.lightText}`}>
              <div className={styles.tileIcon}><Briefcase size={64} /></div>
              <h2>Wyjazdy zorganizowane</h2>
              <h4>Oferty sprawdzonych touroperatorów dla osób, które chcą gotowe rozwiązanie</h4>
              <br/> 
              <h4> - bez samodzielnego planowania</h4>
              <h4> - jasne warunki</h4>
              <h4> - organizatorem jest touroperator</h4>
            </div>
            <div>
              <p> Produkty cyfrowe - Natychmiastowy dostęp</p>
            </div>
            </Link>
          </div>
        <h4 className={styles.sectionNote}>Ebooki są produktami cyfrowymi. Wyjazdy realizowane są przez zewnętrznych touroperatorów.</h4>
        </section>
        </section>       
      </main>
      <Footer />
    </>
  )
}

