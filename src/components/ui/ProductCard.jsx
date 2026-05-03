export default function ProductCard({ product, compact = false }) {
  return (
    <article className="group border border-earth-900/12 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-earth-900/10">
      <div
        className={`overflow-hidden bg-moss-200 ${
          compact ? 'aspect-[4/3]' : 'aspect-[3/3.8]'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight text-earth-900">
            {product.name}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-clay-500">
            {product.tag}
          </span>
        </div>
        <p className="mt-2 min-h-12 text-xs leading-5 text-earth-900/60">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-clay-700">
            {product.price}
          </span>
          <button type="button" className="btn-secondary min-h-8 px-3">
            Detail
          </button>
        </div>
      </div>
    </article>
  )
}
