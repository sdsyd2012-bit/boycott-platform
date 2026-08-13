import { useState } from 'react'

import { FAQS } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import { ChevronDownIcon } from './icons.jsx'

export default function Faq({ faqs = FAQS }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-slate-100/70 py-20 md:py-28 dark:bg-slate-900/30"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          kicker="الأسئلة الشائعة"
          title="كل ما تريد معرفته عن المقاطعة"
          description="إجابات واضحة وموجزة عن أكثر الأسئلة التي تصلنا."
        />
        <div className="mt-12 space-y-3">
          {faqs.map((item, index) => {
            const open = openIndex === index
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                      open ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
