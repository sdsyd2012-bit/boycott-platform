import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  ClapperboardIcon,
  CloseIcon,
  FileTextIcon,
  HeartIcon,
  HomeIcon,
  MoreIcon,
  PackageIcon,
  PlusIcon,
  ScanIcon,
} from './icons.jsx'

function isActiveTab(to, pathname) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to)
}

const MORE_ITEMS = [
  { to: '/articles', label: 'المقالات', icon: FileTextIcon, hint: 'قراءات ووعي أعمق' },
  { to: '/contributions', label: 'مساهماتي', icon: HeartIcon, hint: 'سجل اقتراحاتك' },
  { to: '/contributions', label: 'اقتراح جديد', icon: PlusIcon, hint: 'أضف منتجاً أو شركة' },
]

export default function MobileTabBar() {
  const { pathname } = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    setMoreOpen(false)
  }, [pathname])

  const moreActive =
    pathname.startsWith('/articles') || pathname.startsWith('/contributions')

  return (
    <>
      <nav
        aria-label="التنقل الرئيسي"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-5 items-end">
          <TabItem to="/" label="الرئيسية" Icon={HomeIcon} active={isActiveTab('/', pathname)} />
          <TabItem
            to="/products"
            label="المنتجات"
            Icon={PackageIcon}
            active={isActiveTab('/products', pathname)}
          />

          <div className="flex justify-center">
            <Link to="/scan" aria-label="الماسح الذكي" className="relative -translate-y-3.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/40 ring-4 ring-slate-950 transition active:scale-95">
                <ScanIcon className="h-6 w-6" />
              </span>
            </Link>
          </div>

          <TabItem
            to="/videos"
            label="الفيديوهات"
            Icon={ClapperboardIcon}
            active={isActiveTab('/videos', pathname)}
          />

          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-label="المزيد"
            aria-expanded={moreOpen}
            className="flex flex-col items-center justify-center gap-1 pt-2.5 pb-2"
          >
            <span
              className={`flex h-10 w-14 items-center justify-center rounded-2xl transition ${
                moreActive || moreOpen
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : 'text-slate-400'
              }`}
            >
              <MoreIcon className="h-5 w-5" />
            </span>
            <span
              className={`text-[10px] font-bold transition ${
                moreActive || moreOpen ? 'text-emerald-500' : 'text-slate-500'
              }`}
            >
              المزيد
            </span>
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 animate-fade-in bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 animate-sheet-up rounded-t-3xl border-t border-white/10 bg-slate-950 shadow-2xl">
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/15" aria-hidden="true" />
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <h2 className="text-sm font-extrabold text-white">المزيد</h2>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="إغلاق"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition active:scale-95"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="px-3 pb-3">
              {MORE_ITEMS.map(({ to, label, icon: Icon, hint }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMoreOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3.5 transition active:bg-white/5 ${
                    isActiveTab(to, pathname)
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-200'
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold">{label}</span>
                    <span className="text-[11px] text-slate-500">{hint}</span>
                  </span>
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMoreOpen(false)}
              className="mx-4 mb-4 w-[calc(100%-2rem)] rounded-2xl bg-white/5 py-3.5 text-sm font-bold text-slate-300 transition active:bg-white/10"
            >
              إغلاق
            </button>
            <div
              className="pt-1 text-center text-[10px] text-slate-600"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1rem)' }}
            >
              دليل البدائل — مقاطعة واعية وبدائل آمنة
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function TabItem({ to, label, Icon, active }) {
  return (
    <Link
      to={to}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className="flex flex-col items-center justify-center gap-1 pt-2.5 pb-2"
    >
      <span
        className={`flex h-10 w-14 items-center justify-center rounded-2xl transition ${
          active ? 'bg-emerald-500/15 text-emerald-500' : 'text-slate-400'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span
        className={`text-[10px] font-bold transition ${
          active ? 'text-emerald-500' : 'text-slate-500'
        }`}
      >
        {label}
      </span>
    </Link>
  )
}
