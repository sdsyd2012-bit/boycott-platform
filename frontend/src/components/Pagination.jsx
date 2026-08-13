function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }
  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('start-ellipsis')
  for (let index = start; index <= end; index += 1) pages.push(index)
  if (end < total - 1) pages.push('end-ellipsis')
  pages.push(total)
  return pages
}

export default function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const baseButton =
    'flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition'
  const inactiveButton =
    'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white'
  const activeButton = 'border-emerald-600 bg-emerald-600 text-white shadow-sm'

  return (
    <nav
      aria-label="التنقل بين الصفحات"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${baseButton} ${inactiveButton} disabled:cursor-not-allowed disabled:opacity-40`}
      >
        السابق
      </button>

      {getPageNumbers(currentPage, totalPages).map((item) =>
        typeof item === 'number' ? (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`${baseButton} ${item === currentPage ? activeButton : inactiveButton}`}
          >
            {item}
          </button>
        ) : (
          <span
            key={item}
            className="flex h-10 items-center justify-center px-1 text-sm text-slate-400"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${baseButton} ${inactiveButton} disabled:cursor-not-allowed disabled:opacity-40`}
      >
        التالي
      </button>
    </nav>
  )
}
