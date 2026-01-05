import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './page.module.css'

const benefits = [
  'Indywidualny plan podróży (dzień po dniu lub etapami)',
  'Rekomendacje miejsc, noclegów i transportu',
  'Alternatywy i scenariusze (plan A / B)',
  'Praktyczne wskazówki i checklisty',
  'Uporządkowana, czytelna forma (PDF / online)'
]

const packages = [
  {
    id: '1',
    tier: 'Basic',
    length: '1–3 dni',
    title: 'Pakiet CityHunt',
    scope: '1 miasto',
    price: '149 zł',
    description: 'Krótki wyjazd lub city break. Skupiamy się na esencji miejsca.',
    highlights: ['Ogólny plan', 'Kluczowe rekomendacje'],
    color: '#3F72FF',
    type: 'Europa'
  },
  {
    id: '2',
    tier: 'Standard',
    length: '4–7 dni',
    title: 'Pakiet MultiHunt',
    scope: '1–3 miasta',
    price: '249–299 zł',
    description: 'Wyjazd tygodniowy z opcją łączenia kilku lokalizacji.',
    highlights: ['Plan dzień po dniu', 'Alternatywy i wskazówki'],
    color: '#F2A541',
    type: 'Europa'
  },
  {
    id: '3',
    tier: 'Premium',
    length: '8-13 dni',
    title: 'Pakiet Adventure',
    scope: '1–5 miast',
    price: '399–449 zł',
    description: 'Dłuższa podróż z rozbudowanym planem i większą liczbą atrakcji.',
    highlights: ['Segmentacja trasy', 'Pełne rekomendacje'],
    color: '#2F7B57',
    type: 'Europa'
  },
  {
    id: '4',
    tier: 'Maxi',
    length: '14+ dni',
    title: 'Pakiet Explorer',
    scope: '5+ miast',
    price: '699 zł',
    description: 'Kompleksowa wyprawa trwająca kilka tygodni. Pełna logistyka.',
    highlights: ['Plan wieloetapowy', 'Checklisty formalności'],
    color: '#7952B3',
    type: 'Europa'
  },
  {
    id: '5',
    tier: 'Long Distance',
    length: 'Podróże Dalekodystansowe',
    title: 'Explorer Plus',
    scope: 'Egipt, Azja, USA, multi-country',
    price: 'od 799 zł',
    description:
      'Trasy z lotami przesiadkowymi, kilkoma krajami i dodatkowymi formalnościami.',
    highlights: ['Scenariusze planu A/B', 'Wsparcie logistyczne'],
    color: '#1E4E5C',
    type: 'Dalekodystansowy'
  }
]

export default function PlanowaniePodrozyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>

          <section className={`${styles.section} ${styles.benefitsSection}`}>
            <h2 className={styles.sectionTitle}>Co otrzymujesz w ramach planowania?</h2>
            <ul className={styles.benefitsList}>
              {benefits.map((benefit) => (
                <li key={benefit} className={styles.benefitItem}>
                  <span>●</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </section>

          <section className={`${styles.section} ${styles.packagesSection}`}>
            <h2 className={styles.sectionTitle}>Pakiety planowania podróży</h2>
            <div className={styles.packagesGrid}>
              {packages.map((pkg) => (
                <article key={pkg.id} className={styles.packageCard}>
                  <div className={styles.packageBadge} style={{ backgroundColor: pkg.color }}>
                    <span className={styles.packageTier}>{pkg.title}</span>
                  </div>
                  <div className={styles.packageContent}>
                    <div>
                    <h3 className={styles.packageTitle}>{pkg.length}</h3>
                    <p className={styles.packageMeta}>{pkg.scope}</p>
                    </div>
                    <p className={styles.packageDescription}>{pkg.description}</p>
                    <ul className={styles.packageIncludes}>
                      {pkg.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.packageFooter}>
                    <div>
                      <p className={styles.packagePrice}>{pkg.price}</p>
                      <p className={styles.packageType}>{pkg.type}</p>
                    </div>
                    <a href="/formularz" className={styles.orderButton}>
                      Zamów
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
