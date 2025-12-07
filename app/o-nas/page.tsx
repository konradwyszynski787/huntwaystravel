import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './page.module.css'
import { Plane, Hotel, Target, Briefcase, Users, Award } from 'lucide-react';

const reasons = [
  {
    icon: Plane,
    title: 'Najlepsze loty',
    description: 'Znajdziemy dla Ciebie najlepsze połączenia lotnicze w najlepszych cenach',
  },
  {
    icon: Hotel,
    title: 'Wybór hoteli',
    description: 'Dostosowujemy hotele do Twoich potrzeb i preferencji',
  },
  {
    icon: Target,
    title: 'Personalizacja',
    description: 'Każda podróż jest tworzona specjalnie dla Ciebie',
  },
  {
    icon: Briefcase,
    title: 'Wsparcie 24/7',
    description: 'Jesteśmy dostępni przez całą dobę, aby Ci pomóc',
  },
];

const IconPlane = reasons[0].icon;
const IconHotel = reasons[1].icon;
const IconTarget = reasons[2].icon;
const IconBriefcase = reasons[3].icon;

export default function ONasPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>O nas</h1>
          <p className={styles.subtitle}>
            Poznaj Huntways Travel - Twojego partnera w podróży
          </p>

          {/* About Section */}
          <section className={styles.aboutSection}>
            <div className={styles.aboutContent}>
              <h2 className={styles.sectionTitle}>Kim jesteśmy?</h2>
              <p>
              Jesteśmy ambitnym, lubiącym wyzwania zespołem, który dzięki doświadczeniu w branży lotniczej oraz turystycznej zna rynek i posiada umiejętności tworzenia najlepszych pakietów i wyjazdów za granicę. 
              Kierujemy się wiedzą, strategią oraz indywidualnymi potrzebami klienta. Nasz zespół dokona wszelkich starań, aby każdy wyjazd był w 100% udany
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className={styles.features}>
            <h2 className={styles.sectionTitle}>Dlaczego Huntways Travel?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><IconPlane /></div>
                <h3>Najlepsze loty</h3>
                <p>Znajdujemy dla Ciebie najlepsze połączenia lotnicze w najlepszych cenach</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><IconHotel /></div>
                <h3>{reasons[1].title}</h3>
                <p>Dostosowujemy hotel do Twoich potrzeb i preferencji</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><IconTarget /></div>
                <h3>Personalizacja</h3>
                <p>Każda podróż jest tworzona specjalnie dla Ciebie</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}><IconBriefcase /></div>
                <h3>Wsparcie 24/7</h3>
                <p>Jesteśmy dostępni przez całą dobę, aby Ci pomóc</p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>Nasza misja</h2>
            <p>
            Naszą misją jest dostarczanie spersonalizowanych, szytych na miarę pakietów podróży, niezapomnianych oraz wyjątkowych wyjazdów zorganizowanych, które na długo Państwo zapamiętają. 
            Staramy się, aby każda usługa spełniała Państwa nawet największe oczekiwania.
            </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

