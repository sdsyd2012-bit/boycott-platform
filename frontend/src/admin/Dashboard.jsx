import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { adminApi } from './adminApi.js'
import { useToast } from './Toast.jsx'
import { Spinner } from './ui.jsx'
import {
  ClapperboardIcon,
  FileTextIcon,
  GridIcon,
  PackagePlusIcon,
  StoreIcon,
  TagIcon,
} from '../components/icons.jsx'

export default function Dashboard() {
  const toast = useToast()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let active = true
    adminApi.dashboard().then((result) => {
      if (!active) return
      if (result.ok) {
        setStats(result.data)
      } else {
        toast.error(result.message)
      }
    })
    return () => {
      active = false
    }
  }, [toast])

  const cards = stats
    ? [
        {
          label: 'منتج وعلامة',
          value: stats.products,
          sub: `${stats.products_hidden} مخفي`,
          Icon: StoreIcon,
          to: '/admin/products',
          tone: 'emerald',
        },
        {
          label: 'قيد المقاطعة',
          value: stats.boycotted,
          sub: 'من إجمالي المرئي',
          Icon: GridIcon,
          to: '/admin/products',
          tone: 'rose',
        },
        {
          label: 'منتجات مكتشفة',
          value: stats.discoveries_pending,
          sub: 'بانتظار المراجعة',
          Icon: PackagePlusIcon,
          to: '/admin/discoveries',
          tone: 'slate',
        },
        {
          label: 'صنف',
          value: stats.categories,
          sub: 'تصنيف المنتجات',
          Icon: TagIcon,
          to: '/admin/categories',
          tone: 'slate',
        },
        {
          label: 'مقال',
          value: stats.articles,
          sub: 'مقالات توعوية',
          Icon: FileTextIcon,
          to: '/admin/articles',
          tone: 'slate',
        },
        {
          label: 'فيديو',
          value: stats.videos,
          sub: 'مقاطع توعوية',
          Icon: ClapperboardIcon,
          to: '/admin/videos',
          tone: 'slate',
        },
      ]
    : []

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="h-8 w-8 text-emerald-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map(({ label, value, sub, Icon, to, tone }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-emerald-500/40"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                tone === 'rose'
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400'
                  : tone === 'emerald'
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">
              {value}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {label}
            </p>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            إضافة سريعة
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            أضف محتوى جديداً مباشرة من هنا — سيظهر فوراً في الموقع بعد المزامنة.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/admin/products"
              className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
            >
              إضافة منتج أو كارد
              <StoreIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/admin/articles"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              كتابة مقال جديد
              <FileTextIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              إضافة صنف جديد
              <TagIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/admin/videos"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            >
              إضافة فيديو توعوي
              <ClapperboardIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            كيف تعمل اللوحة؟
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              أي تعديل هنا يُحفظ في قاعدة البيانات فوراً، ويصل تلقائياً لتطبيق الموقع على أجهزة الزوار.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              «الكاردات» هي المنتجات التي تظهر للمستخدمين؛ يمكنك إخفاؤها دون حذفها نهائياً.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              حالة المنتج: «قيد المقاطعة» تُظهره للزائر بلون أحمر، و«دعم وبدائل» بالأخضر.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
