export default function Footer({ onNavigate }) {
  return (
    <footer className="relative z-10 bg-[#f4f4f4] py-16">
      <div className="container-pad grid gap-10 text-[13px] text-earth-900/60 sm:grid-cols-[2fr_1fr_1fr_1.5fr]">
        <div className="flex flex-col">
          <div className="mb-5">
            <span className="font-display text-[18px] font-bold text-earth-900">
              Pottery.id
            </span>
          </div>
          <p className="leading-[1.8] max-w-[200px]">
            © 2026 Pottery.id.<br />
            Sinergi Presisi Digital & Warisan<br />
            Lokal.<br />
            pottery.id
          </p>
          <div className="mt-6 flex items-center gap-4 text-earth-900">
            {/* Globe Icon */}
            <svg className="h-[16px] w-[16px] cursor-pointer hover:text-clay-600 transition" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {/* Share Icon */}
            <svg className="h-[16px] w-[16px] cursor-pointer hover:text-clay-600 transition" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[12px] font-bold text-earth-900">
            Eksplorasi
          </h3>
          <div className="grid gap-3">
            {[
              ['catalog', 'Katalog'],
              ['reservation', 'Lokakarya'],
              ['about', 'Cerita Kami'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className="w-fit text-left hover:text-clay-700 transition"
                onClick={() => onNavigate(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[12px] font-bold text-earth-900">
            Hubungkan
          </h3>
          <div className="grid gap-3">
            {['Instagram', 'WhatsApp', 'Buletin'].map((label) => (
              <a
                key={label}
                href="#"
                className="w-fit text-left hover:text-clay-700 transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[12px] font-bold text-earth-900">
            Kontak
          </h3>
          <p className="leading-[1.8]">
            Studio 45, Keramik Lane<br />
            Bali, Indonesia 80361
          </p>
          <a
            href="mailto:hola@pottery.com"
            className="mt-4 block font-bold text-clay-600 hover:text-clay-700 transition"
          >
            hola@pottery.com
          </a>
        </div>
      </div>
    </footer>
  )
}
