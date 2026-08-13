import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useTheme } from '../hooks/useTheme.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { useToast } from '../admin/Toast.jsx'
import { syncNow, getSyncState, subscribeSyncState } from '../services/syncService.js'
import { FlagIcon, SunIcon, MoonIcon, RotateCwIcon } from './icons.jsx'

export default function MobileTopBar() {
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()
  const [syncState, setSyncState] = useState(getSyncState())
  const online = useOnlineStatus()

  useEffect(() => subscribeSyncState(setSyncState), [])

  const syncing = syncState === 'syncing'

  const handleSync = async () => {
    if (syncing) return
    const result = await syncNow()
    if (result.ok && result.synced) {
      toast.success('تم تحديث البيانات بنجاح')
    } else if (result.offline) {
      toast.error('لا يوجد اتصال بالإنترنت. تعذّرت المزامنة.')
    } else if (result.reason !== 'already-syncing') {
      toast.error('فشلت المزامنة')
    }
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/90 px-4 pt-safe pb-3 backdrop-blur-xl lg:hidden dark:border-white/10">
      <Link to="/" className="flex items-center gap-2.5" aria-label="دليل البدائل" title={online ? 'متصل بالإنترنت' : 'لا يوجد اتصال بالإنترنت'}>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-900">
          <FlagIcon className="h-4 w-auto" />
          <span className={`absolute -top-1 -right-1 flex h-2.5 w-2.5 ${online ? 'animate-ping bg-emerald-400 opacity-75' : 'bg-red-400 opacity-60'} rounded-full`}></span>
          <span className={`absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full ${online ? 'bg-emerald-400' : 'bg-red-500'}`}></span>
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-extrabold tracking-tight text-white">
            دليل البدائل
          </span>
          <span className="mt-0.5 text-[9px] font-semibold tracking-wider text-emerald-400">
            مقاطعة واعية وبدائل آمنة
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          aria-label="تحديث البيانات"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-300 transition active:scale-95"
        >
          <RotateCwIcon
            className={`h-4 w-4 ${syncing ? 'animate-spin text-emerald-400' : ''}`}
          />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="تبديل المظهر"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-300 transition active:scale-95"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-4 w-4 text-amber-400" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  )
}
