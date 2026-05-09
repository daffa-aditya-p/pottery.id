import { useMemo, useState } from 'react'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import AboutPage from './pages/AboutPage'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'
import ReservationPage from './pages/ReservationPage'
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const pages = {
  home: HomePage,
  catalog: CatalogPage,
  reservation: ReservationPage,
  about: AboutPage,
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: false,
    })
  }, [])

  const [activePage, setActivePage] = useState('home')

  const Page = useMemo(() => pages[activePage] ?? HomePage, [activePage])

  const handleNavigate = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-shell">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <Page onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App
