import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'

import { db } from '../db/database.js'
import { toBrand } from '../lib/brand.js'
import Pagination from '../components/Pagination.jsx'
import BrandCard, { DOTS, toneIndex } from '../components/BrandCard.jsx'
import {
  PackageIcon,
  SearchIcon,
  StoreIcon,
  TriangleAlertIcon,
} from '../components/icons.jsx'

const ITEMS_PER_PAGE = 30

const STORE_KEYWORDS = ['مطاعم', 'مطعم', 'كافيه', 'كافي', 'سوبر', 'متجر', 'مقهى', 'محل', 'بقالة']

const isStoreCategory = (name) =>
  STORE_KEYWORDS.some((keyword) => String(name).includes(keyword))

const TYPE_FILTERS = [
  { key: 'all', label: 'الكل', icon: null },
  { key: 'stores', label: 'المحلات', icon: StoreIcon },
  { key: 'products', label: 'المنتجات', icon: PackageIcon },
]

export default function ProductsPage() {
  const products = useLiveQuery(() => db.products.toArray(), [])
  const categories = useLiveQuery(() => db.categories.toArray(), [])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const categoryNames = useMemo(() => {
    if (!categories) return []
    return categories
      .map((category) => category.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'ar'))
  }, [categories])

  const brands = useMemo(() => {
    if (!products || !categories) return []
    const categoryById = new Map(categories.map((category) => [category.id, category]))
    return products
      .filter((product) => !product.is_deleted && product.is_boycotted)
      .map((product) => toBrand(product, categoryById.get(product.category)?.name))
  }, [products, categories])

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return brands
      .filter((brand) => {
        const categoryName = brand.categories[0] || ''
        const matchesSearch =
          !query ||
          brand.name.toLowerCase().includes(query) ||
          brand.description.toLowerCase().includes(query) ||
          categoryName.toLowerCase().includes(query)
        const matchesType =
          selectedType === 'all' ||
          (selectedType === 'stores' ? isStoreCategory(categoryName) : !isStoreCategory(categoryName))
        const matchesCategory =
          selectedCategory === 'all' || brand.categories.includes(selectedCategory)
        return matchesSearch && matchesType && matchesCategory
      })
      .sort((a, b) => {
        const aHas = Boolean(a.logo_url)
        const bHas = Boolean(b.logo_url)
        if (aHas !== bHas) return aHas ? -1 : 1
        return a.name.localeCompare(b.name, 'ar')
      })
  }, [brands, searchQuery, selectedType, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const pageItems = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  )
  const resetPage = () => setCurrentPage(1)

  const typeChipClass = (key) => {
    const base = 'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition'
    return selectedType === key
      ? `${base} bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20`
      : `${base} border border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/5 hover:text-white`
  }

  const categoryChipClass = (key) => {
    const base = 'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition'
    return selectedCategory === key
      ? `${base} bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20`
      : `${base} border border-white/15 text-slate-300 hover:border-white/30 hover:bg-white/5 hover:text-white`
  }

  if (!products || !categories) {
    return (
      <section className="py-40 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          جارِ تحميل القائمة…
        </p>
      </section>
    )
  }

  return (
    <section className="py-6 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-sm md:p-8 dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              قائمة المقاطعة
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              {filtered.length} عنصر
            </span>
          </div>

          <div className="relative mt-6">
            <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  resetPage()
                }}
                placeholder="البحث عن منتجات أو محلات"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3.5 ps-4 pe-11 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {TYPE_FILTERS.map((filter) => {
              const Icon = filter.icon
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => {
                    setSelectedType(filter.key)
                    resetPage()
                  }}
                  className={typeChipClass(filter.key)}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className="no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all')
                resetPage()
              }}
              className={categoryChipClass('all')}
            >
              الكل
            </button>
            {categoryNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setSelectedCategory(name)
                  resetPage()
                }}
                className={categoryChipClass(name)}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${DOTS[toneIndex(name)]}`} />
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/10 px-5 py-4">
          <TriangleAlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200 md:text-sm">
            <span className="font-bold">تنويه:</span> هذه القائمة تحتوي أشهر المنتجات والمحلات
            والشركات التي تدعم الاحتلال الصهيوني، ولكن هناك الكثير من المنتجات والشركات والمحلات
            الأخرى التي تدعم الاحتلال الصهيوني والتي سنقوم بإضافتها مع مرور الوقت.
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {pageItems.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-white/15">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              لا توجد نتائج
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              لم نعثر على منتجات تطابق بحثك. جرّب كلمات أخرى أو أعد ضبط الفلاتر.
            </p>
          </div>
        )}

        {filtered.length > ITEMS_PER_PAGE && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">
              صفحة {safePage} من {totalPages} — {ITEMS_PER_PAGE} عنصر في كل صفحة
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
