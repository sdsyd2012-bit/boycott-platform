import { useCallback, useEffect, useState } from 'react'

import { adminApi } from './adminApi.js'
import { useConfirm } from './Confirm.jsx'
import { useToast } from './Toast.jsx'
import { Badge, Button, EmptyState, Spinner, Td, Th } from './ui.jsx'
import { CheckIcon, ClockIcon, PackagePlusIcon, XIcon } from '../components/icons.jsx'
import { syncNow } from '../services/syncService.js'

const STATUS_META = {
  pending: { label: 'قيد المراجعة', tone: 'amber' },
  approved: { label: 'مقبول', tone: 'emerald' },
  rejected: { label: 'مرفوض', tone: 'rose' },
}

export default function DiscoveriesAdmin() {
  const toast = useToast()
  const { confirm, dialog } = useConfirm()
  const [items, setItems] = useState(null)
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const load = useCallback(async () => {
    const result = await adminApi.discoveries({ status: filter })
    if (result.ok) {
      setItems(result.data)
    } else {
      toast.error(result.message)
      setItems([])
    }
  }, [filter, toast])

  useEffect(() => {
    load()
  }, [load, refreshTrigger])

  const handleApprove = async (item) => {
    const ok = await confirm({
      title: 'اعتماد المنتج',
      message: `سيتم نشر «${item.name}» (${item.barcode}) في القائمة العامة ليراها الجميع. متابعة؟`,
      confirmLabel: 'اعتماد ونشر',
    })
    if (!ok) return
    setLoading(true)
    const result = await adminApi.approveDiscovery(item.id)
    setLoading(false)
    if (result.ok) {
      toast.success('تم اعتماد المنتج ونشره في القائمة.')
      syncNow()
    } else {
      toast.error(result.message)
    }
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleReject = async (item) => {
    const ok = await confirm({
      title: 'رفض الاقتراح',
      message: `سيتم رفض مساهمة «${item.name}» ولن تظهر في القائمة. متابعة؟`,
      confirmLabel: 'رفض الاقتراح',
    })
    if (!ok) return
    setLoading(true)
    const result = await adminApi.rejectDiscovery(item.id)
    setLoading(false)
    if (result.ok) {
      toast.success('تم رفض الاقتراح.')
      syncNow()
    } else {
      toast.error(result.message)
    }
    setRefreshTrigger((prev) => prev + 1)
  }

  const filters = [
    { key: 'pending', label: 'قيد المراجعة' },
    { key: 'approved', label: 'مقبولة' },
    { key: 'rejected', label: 'مرفوضة' },
    { key: '', label: 'الكل' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">المنتجات المكتشفة</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            مساهمات يرسلها المستخدمون من صفحة المنتج — اعتمدها لتظهر في القائمة.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.key || 'all'}
            type="button"
            onClick={() => setFilter(filterOption.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              filter === filterOption.key
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-white/10'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {items === null ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8 text-emerald-500" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={filter === '' ? 'لا توجد منتجات مكتشفة بعد' : 'لا توجد نتائج بهذه الحالة'}
          description={
            filter === ''
              ? 'عندما يضيف المستخدمون منتجات من صفحة الباركود، ستظهر هنا للمراجعة.'
              : 'جرّب تصفية أخرى.'
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-right">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950/50">
                <tr>
                  <Th>المنتج</Th>
                  <Th>الباركود</Th>
                  <Th>الحالة</Th>
                  <Th>التاريخ</Th>
                  <Th>إجراءات</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {items.map((item) => {
                  const meta = STATUS_META[item.status] || STATUS_META.pending
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-white/5">
                      <Td>
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                            <PackagePlusIcon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                            {item.brand_name && (
                              <p className="text-xs text-slate-400 dark:text-slate-500">{item.brand_name}</p>
                            )}
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300" dir="ltr">
                          {item.barcode}
                        </code>
                      </Td>
                      <Td>
                        <Badge tone={meta.tone}>{meta.label}</Badge>
                      </Td>
                      <Td className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                        {new Date(item.submitted_at).toLocaleString('ar-EG')}
                      </Td>
                      <Td>
                        {item.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button
                              variant="primary"
                              onClick={() => handleApprove(item)}
                              disabled={loading}
                            >
                              <CheckIcon className="h-4 w-4" />
                              اعتماد
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleReject(item)}
                              disabled={loading}
                            >
                              <XIcon className="h-4 w-4" />
                              رفض
                            </Button>
                          </div>
                        ) : item.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckIcon className="h-4 w-4" />
                            مكرّر في القائمة
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                            <ClockIcon className="h-4 w-4" />
                            مرفوض
                          </span>
                        )}
                      </Td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {dialog}
    </div>
  )
}
