import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './page.module.css'

// Przykładowe dane pakietów - w rzeczywistości można pobrać z API
const packages = [
  {
    id: 1,
    title: 'Weekend w Paryżu',
    destination: 'Paryż, Francja',
    duration: '3 dni',
    price: '2,499',
    currency: 'PLN',
    image: '/Brooklyn_Bridge_v2.png',
    description: 'Romantyczny weekend w stolicy Francji. Zwiedzaj wieżę Eiffla, Luwr i ciesz się francuską kuchnią.',
    includes: ['Lot w obie strony', 'Hotel 3*', 'Śniadania', 'Transfer z lotniska']
  },
  {
    id: 2,
    title: 'Wakacje na Bali',
    destination: 'Bali, Indonezja',
    duration: '7 dni',
    price: '4,999',
    currency: 'PLN',
    image: '/Brooklyn_Bridge_v2.png',
    description: 'Egzotyczna przygoda na rajskiej wyspie. Plaże, świątynie i niezapomniane widoki.',
    includes: ['Lot w obie strony', 'Hotel 4*', 'All Inclusive', 'Wycieczki']
  },
  {
    id: 3,
    title: 'City Break w Rzymie',
    destination: 'Rzym, Włochy',
    duration: '4 dni',
    price: '1,899',
    currency: 'PLN',
    image: '/Brooklyn_Bridge_v2.png',
    description: 'Odkryj Wieczne Miasto - Koloseum, Watykan i najlepsza włoska kuchnia.',
    includes: ['Lot w obie strony', 'Hotel 3*', 'Śniadania', 'Bilety do muzeów']
  },
  {
    id: 4,
    title: 'Safari w Kenii',
    destination: 'Kenia, Afryka',
    duration: '10 dni',
    price: '8,999',
    currency: 'PLN',
    image: '/Brooklyn_Bridge_v2.png',
    description: 'Niezapomniane safari w sercu Afryki. Zobacz Wielką Piątkę w ich naturalnym środowisku.',
    includes: ['Lot w obie strony', 'Lodge safari', 'Pełne wyżywienie', 'Przewodnik']
  },
  {
    id: 5,
    title: 'Relaks na Malediwach',
    destination: 'Malediwy',
    duration: '7 dni',
    price: '12,999',
    currency: 'PLN',
    image: '/Brooklyn_Bridge_v2.png',
    description: 'Luksusowy wypoczynek w raju na ziemi. Białe plaże, krystaliczna woda i ekskluzywne resorty.',
    includes: ['Lot w obie strony', 'Resort 5*', 'All Inclusive', 'Transfer wodolotem']
  },
  {
    id: 6,
    title: 'Kulturowa podróż do Japonii',
    destination: 'Tokio, Japonia',
    duration: '10 dni',
    price: '9,999',
    currency: 'PLN',
    image: '/Brooklyn_Bridge_v2.png',
    description: 'Poznaj tradycję i nowoczesność Kraju Kwitnącej Wiśni. Tokio, Kioto i wiele więcej.',
    includes: ['Lot w obie strony', 'Hotele 4*', 'Śniadania', 'Bilety kolejowe']
  }
]

export default function PakietyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.title}>

<h1> Coming Soon!</h1>
        </div>
      </main>
      <Footer />
    </>
  )
}

