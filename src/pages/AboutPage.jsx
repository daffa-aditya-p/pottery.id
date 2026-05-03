import SectionHeader from '../components/ui/SectionHeader'
import { images, processSteps } from '../data/potteryData'

function StoryCard() {
  return (
    <div className="grid overflow-hidden rounded-sm bg-white shadow-xl shadow-earth-900/10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="min-h-72">
        <img
          src={images.founder}
          alt="Pengrajin Pottery.id"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-7">
        <p className="eyebrow mb-2">Pottery.id</p>
        <h2 className="font-display text-2xl font-bold leading-tight text-earth-900">
          Dari tanah, tangan, lalu menjadi cerita rumah.
        </h2>
        <p className="body-copy mt-4">
          Kami percaya keramik tidak hanya tentang bentuk. Di balik setiap vas,
          mangkok, dan teko ada waktu, percobaan, retak kecil yang dipelajari,
          serta keputusan desain yang dibuat dengan hati-hati.
        </p>
        <p className="body-copy mt-3">
          Website ini menerjemahkan pengalaman studio menjadi katalog,
          reservasi, dan kisah brand yang mudah diakses tanpa kehilangan rasa
          handmade.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="border border-earth-900/10 bg-clay-50 p-4">
            <p className="font-display text-3xl font-bold text-clay-700">12+</p>
            <p className="text-xs text-earth-900/60">Tahun praktik studio</p>
          </div>
          <div className="border border-earth-900/10 bg-clay-50 p-4">
            <p className="font-display text-3xl font-bold text-clay-700">800+</p>
            <p className="text-xs text-earth-900/60">Karya dibuat tangan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main>
      <section
        className="relative min-h-[430px] bg-earth-900"
        style={{
          backgroundImage: `linear-gradient(rgba(25,19,13,0.45), rgba(25,19,13,0.72)), url(${images.artisan})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="container-pad flex min-h-[430px] items-center justify-center py-16 text-center text-white">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-clay-100">
              Tentang Kami
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Warisan Karya Tradisi dalam Sentuhan Digital
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/75">
              Kami membawa cerita tanah liat ke ruang digital dengan katalog,
              reservasi, dan visual yang tetap hangat seperti studio aslinya.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-clay-50 py-16">
        <div className="container-pad">
          <StoryCard />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Kualitas Bahan"
            title="Dari material lokal sampai pembakaran akhir"
            description="Bagian ini mengikuti komposisi panjang pada halaman Tentang: gambar bergantian dengan narasi proses."
          />
          <div className="grid gap-10">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-moss-200">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="eyebrow mb-2">0{index + 1}</p>
                  <h3 className="font-display text-2xl font-bold text-earth-900">
                    {step.title}
                  </h3>
                  <p className="body-copy mt-4">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
