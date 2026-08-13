import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'

import { db } from '../db/database.js'
import { toBrand } from '../lib/brand.js'
import SectionHeading from './SectionHeading.jsx'
import BrandCard from './BrandCard.jsx'
import { ArrowLeftIcon } from './icons.jsx'

const FEATURED_BARCODES = [
  'mcdonalds',
  'cocacola',
  'kfc',
  'carrefour',
  'adidas',
  'lays',
  'burgerking',
  'danone',
  'lorealloreal',
  'benjerrys',
]

const FEATURED_COUNT = 6

export default function FeaturedProducts() {
  const products = useLiveQuery(() => db.products.toArray(), [])
  const categories = useLiveQuery(() => db.categories.toArray(), [])

  const featured = useMemo(() => {
    if (!products || !categories) return []
    const categoryById = new Map(categories.map((category) => [category.id, category]))
    const visible = products.filter((product) => !product.is_deleted && product.is_boycotted)
    const byBarcode = new Map(visible.map((product) => [product.barcode, product]))
    const chosen = FEATURED_BARCODES.map((barcode) => byBarcode.get(barcode)).filter(Boolean)
    const fill = visible
      .filter((product) => !FEATURED_BARCODES.includes(product.barcode) && product.image_url)
      .sort((a, b) => a.brand_name.localeCompare(b.brand_name, 'ar'))
    return [...chosen, ...fill]
      .slice(0, FEATURED_COUNT)
      .map((product) => toBrand(product, categoryById.get(product.category)?.name))
  }, [products, categories])

  if (!products || !categories) {
    return null
  }

  return (
    <section id="featured" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="أبرز الشركات الموثّقة"
            title="علامات تستحق أن تحفظ أثرها"
            description="عينة من أشهر العلامات التجارية المسجلة ضمن قائمة المقاطعة أو البدائل المتاحة."
          />
          <Link
            to="/products"
            className="group inline-flex shrink-0 items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition duration-300 hover:bg-emerald-500 hover:shadow-emerald-600/30 active:scale-95"
          >
            <span>استكشف كافة المنتجات</span>
            <ArrowLeftIcon className="h-4 w-4 transition duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}
