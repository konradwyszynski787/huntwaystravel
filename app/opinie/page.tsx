import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './page.module.css'

export default function OpiniePage() {
  const reviews = [
    {
      id: 1,
      name: 'Anna',
      plan: 'CityHunt',
      rating: 5,
      /* date: '2024-02-20', */
      text: 'Plan był bardzo przejrzysty i logiczny. Wszystko jasno rozpisane, bez chaosu i zbędnych informacji. Dzięki temu przygotowania do wyjazdu były spokojne i uporządkowane.'
    },
    {
      id: 2,
      name: 'Jan',
      plan: 'MultiHunt',
      rating: 5,
      /* date: '2024-02-18', */
      text: 'Profesjonalne podejście do planowania. Otrzymaliśmy konkretne rekomendacje i sensowne alternatywy, które bardzo ułatwiły podjęcie decyzji.'
    },
    {
      id: 3,
      name: 'Maria',
      plan: 'MultiHunt',
      rating: 5,
      /* date: '2024-02-15', */
      text: 'Formularz był intuicyjny, a gotowy plan czytelny i dopasowany do naszych oczekiwań. Wszystko miało sens i było dobrze przemyślane.'
    },
    {
      id: 4,
      name: 'Piotr',
      plan: 'Adventure',
      rating: 5,
      /* date: '2024-02-12', */
      text: 'Doceniam spokojne i rzeczowe podejście. Bez presji, bez sprzedażowych schematów — same konkrety. Plan pomógł uniknąć wielu nietrafionych decyzji.'
    },
    {
      id: 5,
      name: 'Katarzyna',
      plan: 'Explorer',
      rating: 5,
      /* date: '2024-02-10', */
      text: 'Bardzo dobrze uporządkowane informacje i praktyczne wskazówki. Dzięki temu czuliśmy się pewnie jeszcze przed wyjazdem. Cały proces był jasny i przejrzysty.'
    },
    {
      id: 6,
      name: 'Tomasz',
      plan: 'Explorer Plus',
      rating: 5,
      /* date: '2024-02-08', */
      text: 'Profesjonalne doradztwo i przemyślany plan. Widać doświadczenie i realną wiedzę. Wszystko przygotowane w sposób logiczny i zrozumiały.'
    }
  ]

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Opinie klientów</h1>
          <p className={styles.subtitle}>
            Zobacz, co mówią o nas nasi klienci
          </p>
          
          <div className={styles.reviews}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.avatar}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3>{review.name}</h3>
                    </div>
                  </div>
                  <div className={styles.reviewMeta}>
                    <div className={styles.rating}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>
                          ★
                        </span>
                      ))}
                    </div>
                    {/* <p className={styles.date}>{new Date(review.date).toLocaleDateString('pl-PL')}</p> */}
                  </div>
                </div>
                <div className={styles.trip}>
                  <strong>Plan:</strong> {review.plan}
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.ctaSection}>
            <h2>Chcesz podzielić się swoją opinią?</h2>
            <p>Skontaktuj się z nami lub wypełnij formularz podróży!</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

