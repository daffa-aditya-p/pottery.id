export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-earth-900/10 bg-white">
      <div className="container-pad grid gap-8 py-10 text-xs text-earth-900/60 sm:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full border border-clay-600 text-[11px] font-black text-clay-600">
              P
            </span>
            <span className="font-display text-sm font-bold text-clay-700">
              Pottery.id
            </span>
          </div>
          <p className="max-w-52 leading-5">
            Studio keramik handmade untuk karya rumah, hadiah, dan pengalaman
            membentuk tanah liat.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-earth-900">
            Navigasi
          </h3>
          <div className="grid gap-2">
            {[
              ['home', 'Beranda'],
              ['catalog', 'Katalog'],
              ['reservation', 'Reservasi'],
              ['about', 'Tentang Kami'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className="w-fit text-left hover:text-clay-700"
                onClick={() => onNavigate(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-earth-900">
            Kontak
          </h3>
          <p className="leading-5">Jakarta, Indonesia</p>
          <p className="leading-5">+62 812 3400 9921</p>
          <p className="leading-5">halo@pottery.id</p>
        </div>

        <div>
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-earth-900">
            Studio
          </h3>
          <p className="leading-5">
            Buka Selasa sampai Minggu, pukul 10.00 sampai 18.00 WIB.
          </p>
          <button
            type="button"
            className="mt-4 text-xs font-bold text-clay-600 hover:text-clay-700"
            onClick={() => onNavigate('reservation')}
          >
            Jadwalkan kunjungan
          </button>
        </div>
      </div>
    </footer>
  )
}
