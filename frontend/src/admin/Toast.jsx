import { createContext, useCallback, useContext, useRef, useState } from 'react'

import { CheckIcon, XIcon } from '../components/icons.jsx'

const ToastContext = createContext(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) clearTimeout(timer)
    timers.current.delete(id)
  }, [])

  const push = useCallback(
    (message, type = 'success') => {
      const id = ++toastId
      setToasts((current) => [...current, { id, message, type }])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), 4000),
      )
    },
    [dismiss],
  )

  const value = useCallback(
    {
      success: (message) => push(message, 'success'),
      error: (message) => push(message, 'error'),
    },
    [push],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex w-full items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${
              toast.type === 'error'
                ? 'border-rose-200 bg-white text-rose-700 dark:border-rose-500/30 dark:bg-slate-900 dark:text-rose-300'
                : 'border-emerald-200 bg-white text-emerald-700 dark:border-emerald-500/30 dark:bg-slate-900 dark:text-emerald-300'
            }`}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                toast.type === 'error'
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400'
                  : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
              }`}
            >
              {toast.type === 'error' ? (
                <XIcon className="h-3 w-3" />
              ) : (
                <CheckIcon className="h-3 w-3" />
              )}
            </span>
            <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
