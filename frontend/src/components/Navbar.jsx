import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { NAV_LINKS } from '../data/site.js'
import { useTheme } from '../hooks/useTheme.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'
import { useToast } from '../admin/Toast.jsx'
import { syncNow, getSyncState, subscribeSyncState } from '../services/syncService.js'
import {
  FlagIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
  ScanIcon,
  RotateCwIcon,
  PlusIcon,
} from './icons.jsx'

function isActiveLink(href, pathname) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href.split('#')[0])
}

export default function Navbar({ links = NAV_LINKS }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const toast = useToast()
  const [syncState, setSyncState] = useState(getSyncState())
  const online = useOnlineStatus()

  useEffect(() => subscribeSyncState(setSyncState), [])

  const syncing = syncState === 'syncing'

  const handleManualSync = async () => {
    if (syncing) return
    const result = await syncNow()
    if (result.ok && result.synced) {
      toast.success('تم تحديث البيانات بنجاح')
    } else if (result.offline) {
      toast.error('لا يوجد اتصال بالإنترنت. تعذّرت المزامنة.')
    } else if (result.reason === 'already-syncing') {
      // مزامنة أُخرى قيد التنفيذ
    } else {
      toast.error('فشلت المزامنة')
    }
  }

  return (
    <header className="sticky top-0 z-50 hidden border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-xl transition-all duration-300 lg:block dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-3" aria-label="دليل البدائل">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:border-emerald-500/40 dark:border-white/10 dark:bg-slate-900">
            <FlagIcon className="h-5 w-auto text-emerald-600 dark:text-emerald-400 transition group-hover:rotate-6" />
            <span
              className="absolute -top-1 -right-1 flex h-3 w-3"
              role="status"
              title={online ? 'متصل بالإنترنت' : 'لا يوجد اتصال بالإنترنت'}
            >
              <span className={`absolute inline-flex h-full w-full rounded-full ${online ? 'animate-ping bg-emerald-400 opacity-75' : 'bg-red-400 opacity-60'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${online ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
              دليل البدائل
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 -mt-1 tracking-wider uppercase">
              منصة الوعي الاستهلاكي
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 p-1.5 shadow-xs lg:flex dark:border-white/10 dark:bg-slate-900/60">
          {links.map((link) => {
            const isActive = isActiveLink(link.href, pathname)
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Controls Toolbar - Streamlined & Professional */}
        <div className="flex items-center gap-2">
          {/* Quick Action Button: الماسح الذكي */}
          <Link
            to="/scan"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition duration-300 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/25 active:scale-95"
          >
            <ScanIcon className="h-4 w-4 transition group-hover:rotate-12" />
            <span>الماسح الذكي</span>
          </Link>

          {/* Icon Tools Group: Sync & Theme */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white p-1 shadow-2xs dark:border-white/10 dark:bg-slate-900">
            {/* Sync Button */}
            <button
              type="button"
              onClick={handleManualSync}
              disabled={syncing}
              className={`relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 ${
                syncing ? 'text-emerald-600 dark:text-emerald-400' : ''
              }`}
              title="تحديث البيانات المزامنة"
              aria-label="تحديث البيانات المزامنة"
            >
              <RotateCwIcon className={`h-4 w-4 ${syncing ? 'animate-spin text-emerald-500' : ''}`} />
            </button>

            <span className="h-4 w-px bg-slate-200 dark:bg-white/10" />

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              aria-label="تبديل المظهر"
              title="تبديل المظهر"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4 text-amber-400 transition transform hover:rotate-45" />
              ) : (
                <MoonIcon className="h-4 w-4 text-slate-700 transition transform hover:-rotate-12" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs lg:hidden dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
            aria-label="القائمة"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="border-t border-slate-200/80 bg-slate-50/95 px-4 py-4 backdrop-blur-2xl lg:hidden dark:border-white/10 dark:bg-slate-950/95">
          <div className="flex flex-col gap-1.5">
            {links.map((link) => {
              const isActive = isActiveLink(link.href, pathname)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                </Link>
              )
            })}
            <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
              <Link
                to="/scan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700"
              >
                <ScanIcon className="h-4 w-4" />
                استخدام الماسح الذكي
              </Link>
              <Link
                to="/contributions"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200"
              >
                <PlusIcon className="h-4 w-4" />
                تقديم اقتراح جديد
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
