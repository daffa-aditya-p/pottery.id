import ProductCard from '../components/ui/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import { catalogProducts } from '../data/potteryData'

const filters = ['Semua', 'Vas', 'Tableware', 'Dekorasi', 'Limited']

export default function CatalogPage() {
  return (
    <main>
      <section className="bg-clay-50 py-14">
        <div className="container-pad">
          <SectionHeader
            eyebrow="Katalog"
            title="Koleksi Kami"
            description="Kumpulan produk handmade yang tampil dalam frame katalog Figma: grid rapi, filter kategori, dan kartu produk bernuansa tanah."
          />
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full border px-4 py-2 text-xs font-bold ${
                  index === 0
                    ? 'border-clay-600 bg-clay-600 text-white'
                    : 'border-earth-900/15 bg-white text-earth-900/65 hover:border-clay-600 hover:text-clay-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalogProducts.map((product) => (
              <ProductCard key={product.name} product={product} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <button type="button" className="btn-secondary">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
