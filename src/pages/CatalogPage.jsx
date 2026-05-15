export default function CatalogPage() {
  const filters = ['Semua', 'Vas', 'Peralatan Dapur', 'Dekorasi Rumah']

  const products = [
    {
      name: 'Amfora Terracotta',
      price: '$145.00',
      tag: 'BARANG BARU',
      image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?auto=format&fit=crop&w=500&h=500&q=82',
      description: 'Wadah bernuansa tanah perkebunan dengan ukiran tradisional Indonesia.',
    },
    {
      name: 'Mangkuk Bumi Minimalis',
      price: '$85.00',
      tag: '',
      image: 'https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?auto=format&fit=crop&w=500&h=500&q=82',
      description: 'Lapisan matte arang yang dalam, sempurna untuk pengaturan makan modern.',
    },
    {
      name: 'Piring Glazed Serenity',
      price: '$82.00',
      tag: '',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=500&h=500&q=82',
      description: 'Lapisan marble-glass menenangkan yang menangkap cahaya pagi samudera.',
    },
    {
      name: 'Vas Bentuk Organik',
      price: '$210.00',
      tag: '',
      image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=500&h=500&q=82',
      description: 'Sifat bumi bijaksana ukiran yang merayakan ketidaksempurnaan alami yang mentah.',
    },
    {
      name: 'Teko Workshop Kustom',
      price: '$120.00',
      tag: '',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=500&h=500&q=82',
      description: 'Teko tinggi pesanan khusus yang dirancang selama workshop inovasi mutakhir kami.',
    },
    {
      name: 'Lampu Motif Warisan',
      price: '$265.00',
      tag: '',
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&h=500&q=82',
      description: 'Pola bentar yang diukir dengan rumit terinspirasi oleh tenun tekstil lokal.',
    },
  ]

  return (
    <main className="bg-[#f9faec] min-h-screen py-16 sm:py-24">
      <div className="container-pad" data-aos="fade-up">
        {/* Header Section */}
        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-bold text-earth-900 mb-4 sm:text-[40px]">
            Koleksi Kami
          </h1>
          <p className="text-[13px] leading-[1.8] text-earth-900/70 sm:text-[14px]">
            Jelajahi keramik indonesia buatan tangan kami yang teliti, di mana warisan kuno bertemu dengan keahlian digital kontemporer.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[280px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-[14px] w-[14px] text-earth-900/50" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input 
              type="text" 
              placeholder="Cari produk..." 
              className="w-full rounded-[6px] border border-earth-900/15 bg-transparent py-2 pl-9 pr-4 text-[13px] text-earth-900 outline-none focus:border-clay-600 transition"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-4">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-[16px] px-5 py-1.5 text-[11px] font-bold transition ${
                  index === 0
                    ? 'bg-[#6d3b11] text-white shadow-sm'
                    : 'bg-[#e7e6d4] text-earth-900 hover:bg-[#dcdbd0]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="group flex flex-col rounded-[12px] bg-[#efeae0] overflow-hidden shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.tag && (
                  <span className="absolute bottom-3 left-3 rounded-[4px] bg-[#ecd3a3] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-earth-900">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5 pb-6">
                <h3 className="font-display text-[18px] font-bold leading-tight text-earth-900 mb-2">
                  {product.name}
                </h3>
                <p className="flex-1 text-[13px] leading-relaxed text-earth-900/70 mb-6">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-clay-600">
                    {product.price}
                  </span>
                  <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-earth-900 hover:text-clay-600 transition flex items-center gap-1.5">
                    DETAIL <span>→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-14 text-center">
          <button type="button" className="inline-flex items-center justify-center rounded-full border border-clay-600 px-8 py-2.5 text-[11px] font-bold text-clay-600 hover:bg-clay-600 hover:text-white transition">
            LIHAT LEBIH BANYAK
          </button>
        </div>
      </div>
    </main>
  )
}
