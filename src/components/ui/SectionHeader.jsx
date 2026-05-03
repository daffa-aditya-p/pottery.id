export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`mb-8 max-w-2xl ${alignment}`}>
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="section-title">{title}</h2>
          {description ? (
            <p className="body-copy mt-3 max-w-xl">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}
