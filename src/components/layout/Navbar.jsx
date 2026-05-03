import { navItems } from '../../data/potteryData'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid size-7 place-items-center rounded-full border border-clay-600 bg-white text-[11px] font-black text-clay-600">
        P
      </span>
      <span className="font-display text-sm font-bold text-clay-700">
        Pottery.id
      </span>
    </div>
  )
}

export default function Navbar({ activePage, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-earth-900/10 bg-white/92 backdrop-blur">
      <div className="container-pad flex h-14 items-center justify-between gap-4">
        <button
          type="button"
          className="shrink-0 text-left"
          onClick={() => onNavigate('home')}
          aria-label="Buka beranda Pottery.id"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`rounded-sm px-3 py-2 text-[11px] font-semibold transition ${
                activePage === item.id
                  ? 'text-clay-600'
                  : 'text-earth-900/60 hover:text-earth-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="btn-primary min-h-8 px-4"
          onClick={() => onNavigate('reservation')}
        >
          Reservasi Sekarang
        </button>
      </div>
    </header>
  )
}
