export default function SectionHeading({ kicker, title, description, center = false }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400">
        {kicker}
      </span>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
