import { lazy, Suspense } from 'react'
import GalleryStrip from '../components/GalleryStrip'
import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import {
  craftNotes,
  featuredProducts,
  images,
} from '../data/potteryData'

const PotteryScene = lazy(() => import('../components/PotteryScene'))

function HeroSection({ onNavigate }) {
  return (
    <section className="relative h-screen w-full bg-transparent">
      {/* Igloo-style minimal corner layout. Center is empty for the 3D pottery */}
      <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between z-10">
        
        {/* Top Header Area */}
        <div className="flex justify-between items-start w-full">
          {/* Top Left: Main Branding */}
          <div className="max-w-xs" data-aos="fade-right">
            <h1 className="font-display text-4xl md:text-5xl font-black text-earth-900 tracking-tight leading-none mix-blend-difference text-white">
              ARTABUMI
            </h1>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-earth-900/60 mix-blend-difference text-white/60">
              <p>// Est. 2024</p>
              <p>Handmade Ceramic Studio.</p>
              <p>All Rights Reserved.</p>
            </div>
          </div>

          {/* Top Right: Manifesto / Description */}
          <div className="max-w-xs text-right hidden sm:block" data-aos="fade-left">
            <p className="font-mono text-[10px] uppercase tracking-widest text-earth-900/60 mix-blend-difference text-white/60">
              ////// Manifesto
            </p>
            <p className="mt-3 text-xs leading-loose text-earth-900 font-medium mix-blend-difference text-white text-justify" style={{ textAlignLast: 'right' }}>
              Tradisi yang dibentuk kembali. Misi kami adalah membangun standar baru dalam dunia artisan, menggabungkan teknik keramik tradisional dengan presisi desain modern.
            </p>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="flex justify-between items-end w-full">
          {/* Bottom Left: Audio / Sub-actions (Visual only to match igloo style) */}
          <div className="font-mono text-[10px] uppercase tracking-widest text-earth-900/60 mix-blend-difference text-white/60">
            <p>Scroll to explore ↓</p>
          </div>

          {/* Bottom Right: Main Action */}
          <div className="pointer-events-auto" data-aos="fade-up">
            <button
              type="button"
              className="rounded-none border border-earth-900/20 bg-white/10 backdrop-blur-md px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-earth-900 mix-blend-difference text-white hover:bg-white hover:text-black hover:mix-blend-normal transition-all"
              onClick={() => onNavigate('catalog')}
            >
              Eksplorasi Koleksi
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

function InnovationSection() {
  return (
    <section className="bg-white py-24">
      <div className="container-pad grid items-center gap-16 lg:grid-cols-[1fr_400px]" data-aos="fade-up">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth-900/40 mb-4">// Inovasi Modern</p>
          <h2 className="font-display text-4xl font-bold text-earth-900">Sentuhan Presisi</h2>
          <p className="mt-6 text-sm leading-relaxed text-earth-900/60">
            Pottery.id mendokumentasikan proses pembuatan, katalog, dan reservasi lokakarya secara digital tanpa menghilangkan rasa personal dari benda buatan tangan.
          </p>
          <div className="mt-10 border-t border-earth-900/10 pt-6">
            <div className="grid gap-3">
              {craftNotes.map((note) => (
                <div key={note} className="flex gap-4 items-start">
                  <span className="font-mono text-xs text-earth-900/40 mt-0.5">0{craftNotes.indexOf(note)+1}</span>
                  <p className="text-sm font-medium text-earth-900/80">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
          <img src={images.studio} alt="Studio keramik" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

function ProductPreview({ onNavigate }) {
  return (
    <section className="bg-[#F5F5F7] py-24">
      <div className="container-pad" data-aos="fade-up">
        <SectionHeader
          eyebrow="// Klasik Terpilih"
          title="Koleksi Esensial"
          description="Karya minimalis untuk ruang hidup modern. Didesain dengan tenang."
          action={
            <button
              type="button"
              className="text-[10px] uppercase tracking-widest font-bold text-earth-900 border-b border-earth-900 pb-1 hover:text-earth-900/60"
              onClick={() => onNavigate('catalog')}
            >
              Lihat Lengkap →
            </button>
          }
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {featuredProducts.map((product) => (
            <div key={product.name} className="group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkshopSection({ onNavigate }) {
  return (
    <section className="bg-[#111111] py-32 text-white">
      <div className="container-pad grid items-center gap-16 lg:grid-cols-[1fr_500px]">
        <div data-aos="fade-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">// Experience</p>
          <h2 className="font-display text-5xl font-bold">Studio Session</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
            Datang ke studio untuk mencoba wheel throwing, glazing, atau membentuk karya pertama dengan pendampingan pengrajin profesional kami.
          </p>
          <button
            type="button"
            className="mt-10 rounded-none border border-white/20 bg-transparent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            onClick={() => onNavigate('reservation')}
          >
            Reservasi Tempat
          </button>
        </div>
        <div className="aspect-video overflow-hidden grayscale opacity-80" data-aos="fade-left">
          <img src={images.workshop} alt="Workshop" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  )
}

export default function HomePage({ onNavigate }) {
  return (
    <>
      {/* 3D Fixed Background */}
      <div className="fixed inset-0 z-0 bg-[#E8E6E1]">
        <Suspense fallback={null}>
          <PotteryScene />
        </Suspense>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10">
        <HeroSection onNavigate={onNavigate} />
        <InnovationSection />
        <ProductPreview onNavigate={onNavigate} />
        <WorkshopSection onNavigate={onNavigate} />
        <GalleryStrip />
      </div>
    </>
  )
}
