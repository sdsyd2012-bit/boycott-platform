import { useEffect } from 'react'

import { CloseIcon } from '../components/icons.jsx'

export default function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900 ${
          wide ? 'max-w-2xl' : 'max-w-lg'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/70 bg-white/90 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
