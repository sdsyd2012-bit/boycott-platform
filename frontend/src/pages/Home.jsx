import { useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'

import { db } from '../db/database.js'
import { toBrand } from '../lib/brand.js'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import FeaturedProducts from '../components/FeaturedProducts.jsx'
import FeaturedVideos from '../components/FeaturedVideos.jsx'
import Faq from '../components/Faq.jsx'
import About from '../components/About.jsx'

function Home() {
  const products = useLiveQuery(() => db.products.toArray(), [])
  const categories = useLiveQuery(() => db.categories.toArray(), [])

  const stats = useMemo(() => {
    if (!products || !categories) {
      return {}
    }
    const categoryById = new Map(categories.map((category) => [category.id, category]))
    const brands = products
      .filter((product) => !product.is_deleted)
      .map((product) => toBrand(product, categoryById.get(product.category)?.name))
    const avoid = brands.filter((brand) => brand.status === 'avoid')
    const support = brands.length - avoid.length
    const alternatives = brands.reduce(
      (sum, brand) =>
        sum + brand.alternatives_text.split('، ').filter(Boolean).length,
      0,
    )
    return {
      total: brands.length,
      avoid: avoid.length,
      support,
      alternatives,
    }
  }, [products, categories])

  if (!products || !categories) {
    return (
      <section className="py-40 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          جارِ تحميل البيانات…
        </p>
      </section>
    )
  }

  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats stats={stats} />
      <FeaturedProducts />
      <FeaturedVideos />
      <Faq />
      <About />
    </div>
  )
}

export default Home
