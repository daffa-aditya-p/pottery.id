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
    <section className="relative w-full min-h-[100svh] bg-transparent md:min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-[52%] z-10 h-[45svh] -translate-y-1/2 md:hidden">
        <div className="mx-auto h-full w-[90vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.1)_36%,rgba(255,255,255,0)_72%)]" />
      </div>

      {/* Stable mobile grid: top / center-safe-space / bottom */}
      <div className="relative z-20 grid min-h-[100svh] grid-rows-[auto_1fr_auto] px-5 pb-6 pt-5 md:min-h-screen md:px-12 md:pb-10 md:pt-8">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="max-w-[70vw] sm:max-w-xs" data-aos="fade-right">
            <h1 className="font-display text-[36px] font-black leading-none tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] md:text-5xl md:mix-blend-difference">
              ARTABUMI
            </h1>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/80 md:mt-4 md:text-white/60 md:mix-blend-difference">
              <p>// Est. 2024</p>
              <p>Handmade Ceramic Studio.</p>
              <p>All Rights Reserved.</p>
            </div>
          </div>

          <div className="hidden max-w-xs text-right sm:block" data-aos="fade-left">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/65 md:mix-blend-difference">
              ////// Manifesto
            </p>
            <p className="mt-3 text-xs font-medium leading-loose text-white md:mix-blend-difference text-justify" style={{ textAlignLast: 'right' }}>
              Tradisi yang dibentuk kembali. Misi kami adalah membangun standar baru dalam dunia artisan, menggabungkan teknik keramik tradisional dengan presisi desain modern.
            </p>
          </div>
        </div>

        <div />

        <div className="flex w-full items-end justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/75 md:text-white/60 md:mix-blend-difference">
            <p>Scroll to explore ↓</p>
          </div>

          <div className="pointer-events-auto" data-aos="fade-up">
            <button
              type="button"
              className="rounded-none border border-white/35 bg-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-black sm:px-8"
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

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function InnovationSection() {
  const points = [
    "Sistem manajemen inventaris digital yang presisi untuk efisiensi produksi.",
    "Integrasi pasar langsung untuk memastikan kesejahteraan ekonomi perajin.",
    "Sertifikasi Keaslian Digital untuk menjamin otentisitas setiap karya seni."
  ];

  return (
    <section className="bg-[#f6f9e6] py-24 sm:py-32">
      <div className="container-pad grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]" data-aos="fade-up">
        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-clay-600 mb-4">
            TRANSFORMASI DIGITAL
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-earth-900 sm:text-[34px]">
            Inovasi Digital dalam Setiap Sentuhan
          </h2>
          <p className="mt-6 text-[14px] leading-[1.8] text-earth-900/70">
            Kami menghubungkan kearifan lokal Indonesia dengan sistem manajemen global yang canggih. Melalui digitalisasi inventaris yang presisi dan pemantauan rantai pasok secara real-time, kami memberdayakan perajin untuk menjaga kualitas warisan leluhur sambil memenuhi kebutuhan pasar modern secara efisien.
          </p>
          <div className="mt-8 grid gap-5">
            {points.map((point, index) => (
              <div key={index} className="flex gap-4 items-start">
                <CheckIcon />
                <p className="text-[13px] leading-relaxed text-earth-900/80">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          <img 
            src="/foto1.png" 
            alt="Inovasi Digital" 
            className="w-full rounded-[16px] shadow-xl object-cover" 
          />
        </div>
      </div>
    </section>
  )
}

function ProductPreview({ onNavigate }) {
  const products = [
    {
      name: "Vas Tanah Sunda",
      price: "$125",
      description: "Dikerjakan tangan dengan motif berlian tradisional yang autentik.",
      image: "/vasTanahSunda.png"
    },
    {
      name: "Piring Tengah Malam",
      price: "$85",
      description: "Set berisi 4 piring makan arang dengan tekstur matte yang elegan.",
      image: "/piringtengahmalam.png"
    },
    {
      name: "Kendi Vulkanik",
      price: "$145",
      description: "Inspirasi tekstur kawah Gunung Bromo dalam satu mahakarya.",
      image: "/kendivulkanik.png"
    },
    {
      name: "Teko Aliran Tenang",
      price: "$150",
      description: "Desain kontemporer dengan gagang anyaman rotan yang ergonomis.",
      image: "/tekoalirantenang.png"
    }
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-pad" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight text-earth-900 sm:text-[32px]">
              Klasik Terpilih
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-earth-900/60 max-w-md">
              Karya terbaik kami, dibentuk secara manual dengan ketelitian tinggi.
            </p>
          </div>
          <button
            type="button"
            className="group flex items-center gap-2 text-[12px] font-bold text-clay-600 transition hover:text-clay-700"
            onClick={() => onNavigate('catalog')}
          >
            Lihat Seluruh Katalog
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {products.map((product) => (
            <article key={product.name} className="group flex flex-col rounded-[4px] border border-[#E5E5E5] bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="overflow-hidden bg-[#F4F4F4] aspect-[4/5] rounded-[2px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[17px] font-bold leading-tight text-earth-900">
                    {product.name}
                  </h3>
                  <span className="text-[12px] font-bold text-clay-500 shrink-0 mt-0.5">
                    {product.price}
                  </span>
                </div>
                <p className="mt-3 mb-6 flex-1 text-[13px] leading-[1.6] text-earth-900/60">
                  {product.description}
                </p>
                <button 
                  type="button" 
                  className="w-full rounded-[2px] border border-earth-900/20 py-2.5 text-[11px] font-bold text-earth-900 transition hover:border-clay-600 hover:text-clay-600 focus-visible:outline-clay-600"
                >
                  Tambah ke Koleksi
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkshopSection({ onNavigate }) {
  return (
    <section className="bg-[#EAE7D9] py-24 sm:py-32">
      <div className="container-pad grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div data-aos="fade-right">
          <h2 className="font-display text-4xl sm:text-[42px] font-bold leading-[1.1] text-earth-900 max-w-sm">
            Sentuhan Langsung dengan Tanah Liat
          </h2>
          <p className="mt-6 max-w-[420px] text-[13px] leading-[1.8] text-earth-900/70">
            Mari bergabung bersama maestro kami dalam lokakarya imersif. Pelajari teknik putar tradisional dan rahasia glasir yang telah diwariskan lintas generasi.
          </p>
          <button
            type="button"
            className="mt-10 rounded-[8px] bg-[#6d3b11] px-6 py-3.5 text-[12px] font-bold text-white transition hover:bg-[#8e4d0c] shadow-sm"
            onClick={() => onNavigate('reservation')}
          >
            Reservasi Sesi Anda
          </button>
        </div>
        <div className="relative w-full" data-aos="fade-left">
          <img 
            src="/bikingerabah.png" 
            alt="Lokakarya Keramik" 
            className="w-full rounded-[20px] object-cover shadow-lg aspect-[4/3] sm:aspect-[16/11]" 
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
      {/* 3D Fixed Background */}
      <div className="fixed inset-0 z-0 bg-[#E8E6E1]">
        <Suspense fallback={null}>
          <PotteryScene />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.08),rgba(232,230,225,0.84)_62%)]" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 overflow-x-clip">
        <HeroSection onNavigate={onNavigate} />
        <InnovationSection />
        <ProductPreview onNavigate={onNavigate} />
        <WorkshopSection onNavigate={onNavigate} />
        <GalleryStrip />
      </div>
    </>
  )
}
