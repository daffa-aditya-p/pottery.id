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
  return (
    <header className="sticky top-0 z-30 border-b border-earth-900/10 bg-[#f4f4f4]">
      <div className="container-pad flex h-[72px] items-center justify-between gap-4">
        <button
          type="button"
          className="shrink-0 text-left transition hover:opacity-80"
          onClick={() => onNavigate('home')}
          aria-label="Buka beranda Pottery.id"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-8 sm:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
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
          className="inline-flex min-h-[40px] items-center justify-center rounded-[10px] bg-gradient-to-r from-clay-500 to-clay-700 px-6 text-[13px] font-bold text-white shadow-md transition hover:from-clay-600 hover:to-earth-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
          onClick={() => onNavigate('reservation')}
        >
          Reservasi Sekarang
        </button>
      </div>
    </header>
  )
}
