'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BookingForm from '../../components/BookingForm'
import styles from './page.module.css'

const usaPackages = [
  {
    id: 1,
    title: 'Parki narodowe dzikiego zachodu',
    destination: 'USA - CA, AZ, UT, NV',
    date: '20.03 – 05.04 2026',
    duration: '17 dni',
    price: '3,650',
    currency: 'USD',
    image: '/ParkiNarodowe.jpg',
    description: 'W tym roku mamy dla Was zjawiskową propozycję odpoczynku od mroźnej zimy w Polsce, gdzie śnieżną biel zastąpimy marsjańskimi formacjami skalnymi Indian Navajo. Już pierwszego dnia na amerykańskiej ziemi wypłyniemy na rejs po Oceanie Spokojnym na wyspę Catalina. Słońce, rum, delfiny, a przy odrobinie szczęścia może wieloryby! To wszystko będzie nadawać ton tej wyprawie przez najbliższe dni. Odwiedzimy Los Angeles, San Francisco, 7 Parków Narodowych i tereny indiańskie w Arizonie i Utah, po czym przemykając przez mekkę hazardu – Las Vegas, zawitamy w góry Sierra Nevada. Nietuzinkowej wyprawie czas start.',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 2,
    title: 'Hawaje wiosenny powiew',
    destination: 'Hawaje i USA',
    date: '11.04 – 25.04 2026',
    duration: '15 dni',
    price: '4,000',
    currency: 'USD',
    image: '/Hawaje.jpg',
    description: 'Zmęczeni zimą, spragnieni słońca, gorącego piasku i po prostu wakacji. Ta wyprawa da Wam ukojenie pod każdym względem, będzie ona tak egzotycznie urozmaicona, że z pewnością wniesie dużo świeżości i pozytywnej energii do Waszego życia na resztę roku. Zaczniemy od 6-dniowej wizyty na Hawajach, gdzie polinezyjski klimat, piaszczyste plaże, zachody słońca z kokosem w ręku otworzą nam oczy po zimowej hibernacji. Po czym, odkryjemy tajemnice takich miast ikon w USA jak Los Angeles, San Francisco czy Las Vegas. Do tego Parki Narodowe i kultowe atrakcje, doborowe towarzystwo i oczywiście pozytywny Vibe. Odwiedzimy 4 stany, każdy to inna kultura, obyczaje, kulinaria i klimat, każdy z nich dostarczy nam wspomnień do końca życia.',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 3,
    title: 'Majówka - moc parków narodowych',
    destination: 'USA - CA, AZ, UT, NV                             ',
    date: '25.04-11.05',
    duration: '17 dni',
    price: '3,800',
    currency: 'USD',
    image: '/Majówka.jpg',
    description: 'W tym roku mamy dla Was zjawiskową propozycję odpoczynku po mroźnej zimie w Polsce, gdzie śnieżną biel zastąpimy marsjańskimi formacjami skalnymi Indian Navajo. Już pierwszego dnia na amerykańskiej ziemi wypłyniemy na rejs po Oceanie Spokojnym na wyspę Catalina. Słońce, rum, delfiny, a przy odrobinie szczęścia może wieloryby! To wszystko będzie nadawać ton tej wyprawie przez najbliższe dni. Odwiedzimy Los Angeles i San Francisco, 7 Parków Narodowych i tereny indiańskie w Arizonie i Utah, po czym przemykając przez mekkę hazardu – Las Vegas, zawitamy do Virginia City – stalicy wielkiej gorączki złota oraz majestatycznego Lake Tahoe. Nietuzinkowej wyprawie czas start.',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 4,
    title: 'Ekspedycja na Alaske',
    destination: 'USA - Alaska',
    date: '30.05-14.06 2026',
    duration: '16 dni',
    price: '6,100',
    currency: 'USD',
    image: '/Alaska.jpg',
    description: 'HIT sezonu ………. Zabieramy Was tam, gdzie marzenia nie znają granic,  noc nie zapada, gdzie wszechobecne połacie lodowców chylą czoła wielorybom. Zabieramy Was w krainę nieskazitelności, gdzie niedźwiedź brunatny bezkrwawą z łososiem toczy potyczkę, gdzie szczyt najwyższej góry kontynentu zawładnie nam dusze…. a otchłań błogości natury wprawi w pozytywny Vibe. Alaska!',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 5,
    title: 'Górale',
    destination: 'USA - UT, WY, MT, WA, OR, NV                             ',
    date: '14.06-29.06 2026',
    duration: '16 dni',
    price: '3,800',
    currency: 'USD',
    image: '/Gorale.jpg',
    description: 'Kolejna wyprawa, która wzbije Was w przestworza zachwytu. Tym razem mamy coś dla miłośników gór. Dla tych, dla których trekking, dzika przyroda i obcowanie z naturą to sposób bycia, ale i dla tych, którzy cenią sobie ciszę na końcu świata. Przemierzymy 6 stanów w poszukiwaniu nieokiełznanego żywiołu: Nevada, Utah, Wyoming, Montana, Washington oraz Oregon. Każde z tych miejsc zauroczy nas swoją magią, a znajdujące się tam Parki Narodowe: Yosemite NP, Grand Teton NP, Yellowstone NP, Glacier NP, North Cascades NP czy Mt Rainer podzielą się z nami swoimi niepowtarzalnymi krajobrazami i klimatem. Wrót swych uchylą nam takie miasta jak: Salt Lake City, Seatle czy Portland. Ta wyprawa jest ukojeniem wszelkich trosk, pośpiechu, stresu, tak po prostu codzienności. Jesteśmy my i natura, która wlewa w nas całą swoją ziemską pozytywną energię. No to ruszamy!',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 6,
    title: 'Słoneczniki',
    destination: 'USA - CA, AZ, NV',
    date: '04.07-18.07 2026',
    duration: '15 dni',
    price: '3,700',
    currency: 'USD',
    image: '/Sloneczniki.jpg',
    description: 'Kolejna wystrzałowa wyprawa, która sprawi, że pokochacie lato, luz i kalifornijskie słońce.  Każdego dnia będziecie chcieli więcej i więcej, a my, zdeterminowani Waszymi pragnieniami, dołożymy wszelkich starań, by te wojaże były pretekstem do rychłego powrotu do Stanów Zjednoczonych. Pierwszy etap to 11 dni i fascynujące 2000 mil (3220 km) plus 60 mil morskich. Ocean, pustynia, góry, różnorodna kultura, kulinaria i zmieniające się jak w kalejdoskopie krajobrazy będą odskocznią od trudów podróży, którym to, raz, po raz, będziemy dawali zasłużony upust, by pełni pozytywnych wibracji zawitać do Lake Tahoe. Kolejne 2 dni to czas relaksu, odpoczynku, ale i niezapomnianych wrażeń, gdzie otoczeni rodzinną atmosferą będziecie odnajdywać swoje JA.',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 7,
    title: 'California dream',
    destination: 'USA - CA, AZ, OR',
    date: '13.08 – 31.08 2026',
    duration: '18 dni',
    price: '3,900',
    currency: 'USD',
    image: '/Kalifornia.jpg',
    description: 'Kolejna wystrzałowa wyprawa, która sprawi, że pokochacie lato, luz i kalifornijskie słońce. Każdego dnia będziecie chcieli więcej i więcej, a my, zdeterminowani Waszymi pragnieniami, dołożymy wszelkich starań, by te wojaże były pretekstem do rychłego powrotu do Stanów Zjednoczonych. Ocean, pustynia, góry, różnorodna kultura, kulinaria i zmieniające się jak w kalejdoskopie krajobrazy będą odskocznią od trudów podróży, którym to, raz, po raz, będziemy dawali zasłużony upust, by pełni pozytywnych wibracji zawitać do Lake Tahoe. A wisienką na torcie będzie stan Oregon i wizyta w Parku Narodowym Crater Lake. Wycieczka to czas relaksu, odpoczynku, ale i niezapomnianych wrażeń, gdzie otoczeni rodzinną atmosferą będziecie odnajdywać swoje JA.',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  },
  {
    id: 8,
    title: 'Wyjazd szyty na miarę',
    destination: 'Specjalne zamówienie',
    date: 'Data indywidualna',
    duration: 'Długość wyjazdu indywidualna',
    price: 'Cena indywidualna',
    currency: '',
    image: '/Wyjazd_na_miare.jpg',
    description: 'Oferujemy również wyjazdy szyte na miarę na specjalne zamówienie osób indywidualnych bądź grup.',
    includes: ['Noclegi', 'Opieka polskiego pilota', 'Wstępy do miejsc ujętych w wyjeździe', 'Samochód', 'Koszty organizacyjne']
  }
]

export default function USAPackagesPage() {
  const [showBookingForm, setShowBookingForm] = useState<string | null>(null)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <button className={styles.backButton} onClick={() => window.location.href = '/wyjazdy'}>
            ← Wróć
          </button>
          <h1 className={styles.title}>Wyjazdy zorganizowane USA</h1>
          <p className={styles.subtitle}>
            Odkryj z nami zachodnie wybrzeże USA, Alaskę, Hawaje i wiele innych niesamowitych miejsc
          </p>
          
          <div className={styles.packagesGrid}>
            {usaPackages.map((pkg) => (
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
