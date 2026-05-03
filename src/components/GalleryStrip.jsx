import { galleryImages } from '../data/potteryData'

export default function GalleryStrip() {
  return (
    <section className="bg-clay-50 py-8">
      <div className="container-pad">
        <div className="mb-5 text-center">
          <p className="eyebrow">Pottery.id</p>
          <p className="mt-1 text-xs text-earth-900/55">
            Kilasan dari studio, pembakaran, dan koleksi kecil kami.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className="aspect-[4/3] overflow-hidden bg-moss-200"
            >
              <img
                src={image}
                alt={`Galeri studio Pottery.id ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
