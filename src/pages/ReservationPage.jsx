import ReservationForm from '../components/ReservationForm'
import SectionHeader from '../components/ui/SectionHeader'
import WorkshopCalendar from '../components/WorkshopCalendar'
import { faqs, images } from '../data/potteryData'

export default function ReservationPage() {
  return (
    <main>
      <section className="bg-clay-50 py-14">
        <div className="container-pad grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div data-aos="fade-right">
            <p className="eyebrow mb-2">Reservasi Sekarang</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-earth-900 sm:text-5xl">
              Tempa Warisanmu Sendiri
            </h1>
            <p className="body-copy mt-5 max-w-xl">
              Pilih jadwal kunjungan studio atau lokakarya, lalu ceritakan
              kebutuhanmu. Kami akan menghubungi kembali untuk konfirmasi slot.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" className="btn-primary">
                Reservasi
              </button>
              <button type="button" className="btn-secondary">
                Lihat Jadwal
              </button>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl shadow-earth-900/15" data-aos="flip-right">
            <img
              src={images.hero}
              alt="Tangan membentuk tanah liat di atas wheel"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-moss-300 py-16">
        <div className="container-pad" data-aos="fade-up" data-aos-duration="800">
          <SectionHeader
            align="center"
            eyebrow="Ciptakan Karya Agung Anda"
            title="Pilih sesi dan tinggalkan catatan"
            description="Form ini mengikuti frame reservasi Figma: panel tenang, input ringkas, dan tombol aksi cokelat."
          />
          <div className="mx-auto max-w-2xl">
            <ReservationForm />
          </div>
        </div>
      </section>

      <section className="bg-clay-50 py-16">
        <div className="container-pad" >
          <div data-aos="fade-right">
            <SectionHeader
            align="center"
            eyebrow="Kalender Lokakarya"
            title="Pilih tanggal yang cocok"
            description="Slot studio ditandai supaya pengunjung langsung paham ketersediaan kelas."
          />
          </div>
          <div data-aos="flip-right">
            <WorkshopCalendar />
          </div>
        </div>
      </section>

      <section className="bg-moss-300 py-16">
        <div className="container-pad grid gap-10 lg:grid-cols-[1fr_420px]" data-aos="fade-up" data-aos-duration="700">
          <div>
            <p className="eyebrow mb-2">Mari Berkoneksi Bersama</p>
            <h2 className="section-title">Kami siap menjawab sebelum kamu datang</h2>
            <p className="body-copy mt-4">
              Untuk kunjungan grup, acara khusus, atau pesanan korporat,
              tinggalkan pesan singkat agar tim kami bisa menyiapkan sesi yang
              sesuai.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-earth-900/70">
              <p>Studio: Jakarta Selatan</p>
              <p>WhatsApp: +62 812 3400 9921</p>
              <p>Email: reservasi@pottery.id</p>
            </div>
          </div>
          <div className="rounded-sm bg-clay-100 p-6">
            <ReservationForm compact />
          </div>
        </div>
      </section>

      <section className="bg-clay-50 py-14">
        <div className="container-pad max-w-3xl" data-aos="fade-left">
          <h2 className="section-title text-center">Pertanyaan Umum</h2>
          <div className="mt-8 divide-y divide-earth-900/10 border-y border-earth-900/10">
            {faqs.map((question) => (
              <details key={question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-earth-900">
                  {question}
                  <span className="text-clay-600 group-open:rotate-45">+</span>
                </summary>
                <p className="body-copy mt-3">
                  Tim Pottery.id akan membantu menyesuaikan jadwal, pengiriman,
                  dan tingkat kelas sesuai kebutuhan peserta.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
