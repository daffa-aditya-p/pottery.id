import { useEffect, useState } from 'react'
import { navItems } from '../../data/potteryData'

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Pottery.id Logo" className="h-[42px] w-[42px] rounded-full object-contain bg-white" />
      <span className="font-display text-[20px] font-bold text-clay-700">
        Pottery.id
      </span>
    </div>
  )
}

export default function Navbar({ activePage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigate = (page) => {
    onNavigate(page)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setIsMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-earth-900/10 bg-[#f4f4f4]">
      <div className="container-pad flex h-[72px] items-center justify-between gap-4">
        <button
          type="button"
          className="shrink-0 text-left transition hover:opacity-80"
          onClick={() => handleNavigate('home')}
          aria-label="Buka beranda Pottery.id"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-8 sm:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`pb-1 text-[13px] font-semibold transition-all ${
                activePage === item.id
                  ? 'border-b-[2px] border-clay-600 text-clay-600'
                  : 'border-b-[2px] border-transparent text-earth-900/60 hover:text-earth-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="hidden min-h-[40px] items-center justify-center rounded-[10px] bg-gradient-to-r from-clay-500 to-clay-700 px-6 text-[13px] font-bold text-white shadow-md transition hover:from-clay-600 hover:to-earth-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600 sm:inline-flex"
          onClick={() => handleNavigate('reservation')}
        >
          Reservasi Sekarang
        </button>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-earth-900/20 text-earth-900 transition-colors duration-300 hover:bg-black/5 sm:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path
              d="M4 7h16"
              className={`origin-center transition-all duration-300 ${isMenuOpen ? 'translate-y-[5px] rotate-45' : ''}`}
            />
            <path
              d="M4 12h16"
              className={`transition-all duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <path
              d="M4 17h16"
              className={`origin-center transition-all duration-300 ${isMenuOpen ? '-translate-y-[5px] -rotate-45' : ''}`}
            />
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav-menu"
        className={`container-pad grid overflow-hidden pb-0 transition-all duration-400 ease-out sm:hidden ${
          isMenuOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div
            className={`rounded-xl border border-earth-900/10 bg-white p-3 shadow-md transition-all duration-400 ${
              isMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-2 scale-[0.98]'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
                    activePage === item.id
                      ? 'bg-clay-100 text-clay-700'
                      : 'text-earth-900/75 hover:bg-clay-50 hover:text-earth-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNavigate('reservation')}
                className="mt-1 inline-flex min-h-[40px] items-center justify-center rounded-[10px] bg-gradient-to-r from-clay-500 to-clay-700 px-6 text-[13px] font-bold text-white shadow-md transition hover:from-clay-600 hover:to-earth-900"
              >
                Reservasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
