import { galleryImages } from '../data/potteryData'

export default function GalleryStrip() {
  return (
    <section className="bg-[#f6f9e6] py-16 sm:py-24">
      <div className="container-pad" data-aos="fade-up">
        <div className="mb-12 text-center">
          <h2 className="font-display text-[26px] font-bold text-clay-700">Poterry.id</h2>
          <p className="mt-3 text-[13px] text-earth-900/60">
            Ikuti perjalanan estetika kami melalui Instagram.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className="aspect-square overflow-hidden rounded-[12px] shadow-sm transition hover:shadow-md hover:-translate-y-1 duration-300"
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
