export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">
          {hint}
        </span>
      )}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600'

export function TextInput(props) {
  return <input type="text" className={inputClass} {...props} />
}

export function TextArea({ rows = 4, ...props }) {
  return <textarea rows={rows} className={`${inputClass} resize-y leading-relaxed`} {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className={`${inputClass} appearance-none`} {...props}>
      {children}
    </select>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? 'left-0.5' : 'left-[22px]'
          }`}
        />
      </span>
      {label && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </button>
  )
}

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60',
    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-white/20',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60',
    ghost:
      'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white',
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export function Badge({ tone = 'slate', children }) {
  const tones = {
    slate:
      'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    emerald:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    amber:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${className}`} aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-white/15">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
  )
}

export function Th({ children, className = '' }) {
  return (
    <th
      className={`px-5 py-3 text-start text-xs font-bold text-slate-500 dark:text-slate-400 ${className}`}
    >
      {children}
    </th>
  )
}

export function Td({ children, className = '' }) {
  return (
    <td className={`px-5 py-4 text-sm text-slate-700 dark:text-slate-300 ${className}`}>
      {children}
    </td>
  )
}
