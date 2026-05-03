import GalleryStrip from '../components/GalleryStrip'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import {
  craftNotes,
  featuredProducts,
  images,
} from '../data/potteryData'

function HeroSection({ onNavigate }) {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden bg-earth-900"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(25,19,13,0.9), rgba(25,19,13,0.42), rgba(25,19,13,0.05)), url(${images.hero})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="container-pad flex min-h-[560px] items-center py-20">
        <div className="glass-panel max-w-[380px] p-7 text-white">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-clay-100">
            Handmade Ceramic Studio
          </p>
          <h1 className="font-display text-4xl font-bold leading-none sm:text-5xl">
            Merevitalisasi Tradisi: Warisan Digital Artabumi Pottery
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/75">
            Karya keramik tanah liat yang memadukan teknik tradisional,
            desain modern, dan pengalaman studio yang hangat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate('catalog')}
            >
              Belanja Koleksi
            </button>
            <button
              type="button"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:text-white"
              onClick={() => onNavigate('reservation')}
            >
              Ikut Lokakarya
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InnovationSection() {
  return (
    <section className="bg-clay-50 py-16">
      <div className="container-pad grid items-center gap-10 lg:grid-cols-[1fr_360px]">
        <div className="max-w-xl">
          <p className="eyebrow mb-2">Tradisi Bertemu Ide Baru</p>
          <h2 className="section-title">Inovasi Digital dalam Setiap Sentuhan</h2>
          <p className="body-copy mt-4">
            Pottery.id mendokumentasikan proses pembuatan, katalog, dan
            reservasi lokakarya secara digital tanpa menghilangkan rasa
            personal dari benda buatan tangan.
          </p>
          <div className="mt-7 grid gap-4">
            {craftNotes.map((note) => (
              <div key={note} className="flex gap-3">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-clay-600 text-[10px] font-bold text-white">
                  +
                </span>
                <p className="text-sm leading-6 text-earth-900/70">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl shadow-earth-900/15">
            <img
              src={images.studio}
              alt="Susunan karya keramik di studio"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 max-w-36 bg-clay-100 p-4 text-xs font-semibold leading-5 text-clay-700 shadow-lg">
            Sentuhan tanah liat, dokumentasi, dan cerita studio.
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductPreview({ onNavigate }) {
  return (
    <section className="bg-white py-16">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Klasik Terpilih"
          title="Koleksi rumah yang terasa hidup"
          description="Pilihan karya kecil yang muncul di desain Figma: vas, piring, kendi, dan teko dengan warna tanah yang tenang."
          action={
            <button
              type="button"
              className="text-xs font-bold text-clay-600 hover:text-clay-700"
              onClick={() => onNavigate('catalog')}
            >
              Lihat Katalog Lengkap
            </button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkshopSection({ onNavigate }) {
  return (
    <section className="bg-moss-300 py-14">
      <div className="container-pad grid items-center gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="eyebrow mb-2">Studio Experience</p>
          <h2 className="section-title">Sentuhan Langsung dengan Tanah Liat</h2>
          <p className="body-copy mt-4">
            Datang ke studio untuk mencoba wheel throwing, glazing, atau
            membentuk karya pertama dengan pendampingan pengrajin kami.
          </p>
          <button
            type="button"
            className="btn-primary mt-7"
            onClick={() => onNavigate('reservation')}
          >
            Reservasi Sekarang
          </button>
        </div>
        <div className="aspect-[16/10] overflow-hidden rounded-sm shadow-xl shadow-earth-900/15">
          <img
            src={images.workshop}
            alt="Peserta lokakarya membuat keramik"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default function HomePage({ onNavigate }) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <InnovationSection />
      <ProductPreview onNavigate={onNavigate} />
      <WorkshopSection onNavigate={onNavigate} />
      <GalleryStrip />
    </>
  )
}
