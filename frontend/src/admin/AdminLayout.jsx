import { useState } from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { clearSession, getAdminUser, getToken } from './adminApi.js'
import {
  ClapperboardIcon,
  FileTextIcon,
  FlagIcon,
  GridIcon,
  LogoutIcon,
  MenuIcon,
  PackagePlusIcon,
  StoreIcon,
  TagIcon,
  XIcon,
} from '../components/icons.jsx'
import { useToast } from './Toast.jsx'

const NAV_ITEMS = [
  { to: '/admin', end: true, label: 'لوحة المعلومات', Icon: GridIcon },
  { to: '/admin/products', label: 'المنتجات والكاردات', Icon: StoreIcon },
  { to: '/admin/discoveries', label: 'المنتجات المكتشفة', Icon: PackagePlusIcon },
  { to: '/admin/categories', label: 'الأصناف', Icon: TagIcon },
  { to: '/admin/articles', label: 'المقالات', Icon: FileTextIcon },
  { to: '/admin/videos', label: 'الفيديوهات', Icon: ClapperboardIcon },
]

const TITLES = {
  '/admin': 'لوحة المعلومات',
  '/admin/products': 'المنتجات والكاردات',
  '/admin/discoveries': 'المنتجات المكتشفة',
  '/admin/categories': 'الأصناف',
  '/admin/articles': 'المقالات',
  '/admin/videos': 'الفيديوهات',
}

export default function AdminLayout() {
  const token = getToken()
  const user = getAdminUser()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!token) return <Navigate to="/admin/login" replace />

  const handleLogout = () => {
    clearSession()
    toast.success('تم تسجيل الخروج بنجاح.')
    navigate('/admin/login', { replace: true })
  }

  const title = TITLES[location.pathname] || 'لوحة التحكم'

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900">
          <FlagIcon className="h-5 w-auto" />
        </span>
        <span className="font-display text-base font-bold text-white">
          دليل البدائل
        </span>
      </Link>

      <p className="mt-2 px-5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        الإدارة
      </p>
      <nav className="mt-3 flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, end, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <GridIcon className="h-5 w-5 shrink-0" />
          معاينة الموقع
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-rose-500/10"
        >
          <LogoutIcon className="h-5 w-5 shrink-0" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-svh bg-slate-100 dark:bg-slate-950">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 border-l border-white/10 bg-slate-950 lg:block">
        {sidebarContent}
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 w-72 bg-slate-950 shadow-2xl">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="إغلاق القائمة"
              className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="lg:pr-64">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-100/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="فتح القائمة"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 lg:hidden dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white sm:flex">
                {(user?.display_name || 'م')[0]}
              </span>
              <span className="hidden text-sm font-semibold text-slate-700 sm:block dark:text-slate-300">
                {user?.display_name || 'المدير'}
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
