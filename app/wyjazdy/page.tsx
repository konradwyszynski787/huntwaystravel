'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './page.module.css'

const categories = [
  {
    id: 1,
    title: 'Wyjazdy zorganizowane USA',
    destination: 'Kalifornia, Alaska, Hawaje i inne',
    image: '/USA.jpeg',
    description: 'Odkryj z nami zachodnie wybrzeże USA, Alaskę, Hawaje i wiele innych niesamowitych miejsc. Przygotowane pakiety z polskim pilotem.',
    link: '/wyjazdy/usa'
  },
  {
    id: 2,
    title: 'Wyjazdy zorganizowane Afryka',
    destination: 'Uganda, Tanzania, Kenya, Rwanda',
    image: '/Afryka.jpeg',
    description: 'Niezapomniane safari i przygoda w sercu Afryki. Współpraca z lokalnym touroperatorem Mandela Safari.',
    link: '/wyjazdy/afryka'
  }
]

export default function WyjazdyPage() {
 return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Wyjazdy zorganizowane</h1>
          <p className={styles.subtitle}>
            Wybierz region i odkryj nasze przygotowane pakiety wyjazdów
          </p>
          
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <div key={category.id} className={styles.categoryCard} onClick={() => window.location.href = category.link}>
                <div className={styles.categoryImage}>
                  <img src={category.image} alt={category.title} />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <p className={styles.categoryDestination}>{category.destination}</p>
                  <p className={styles.categoryDescription}>{category.description}</p>
                  
                  <div className={styles.categoryFooter}>
                    <button className={styles.exploreButton}>
                      Zobacz wyjazdy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

