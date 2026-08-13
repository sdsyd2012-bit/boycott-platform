import { useCallback, useEffect, useMemo, useState } from 'react'

import { adminApi } from './adminApi.js'
import { useToast } from './Toast.jsx'
import { useConfirm } from './Confirm.jsx'
import Modal from './Modal.jsx'
import {
  Button,
  EmptyState,
  Field,
  Spinner,
  Td,
  TextInput,
  Th,
} from './ui.jsx'
import { EditIcon, PlusIcon, SaveIcon, SearchIcon, TagIcon, TrashIcon } from '../components/icons.jsx'
import { syncNow } from '../services/syncService.js'

const emptyForm = { name: '', icon: '' }

export default function CategoriesAdmin() {
  const toast = useToast()
  const { confirm, dialog } = useConfirm()
  const [categories, setCategories] = useState(null)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const load = useCallback(async () => {
    const result = await adminApi.list('categories')
    if (result.ok) setCategories(result.data)
    else toast.error(result.message)
  }, [toast])

  useEffect(() => {
    load()
  }, [load, refreshTrigger])

  const filtered = useMemo(() => {
    if (!categories) return []
    const query = search.trim().toLowerCase()
    return categories.filter((category) => category.name.toLowerCase().includes(query))
  }, [categories, search])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (category) => {
    setEditing(category)
    setForm({ name: category.name, icon: category.icon || '' })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const result = editing
      ? await adminApi.update('categories', editing.id, { ...form })
      : await adminApi.create('categories', { ...form })
    setSaving(false)
    if (result.ok) {
      toast.success(editing ? 'تم حفظ التعديلات.' : 'تمت إضافة الصنف.')
      setModalOpen(false)
      setRefreshTrigger((prev) => prev + 1)
      syncNow()
    } else {
      toast.error(result.message)
    }
  }

  const handleDelete = async (category) => {
    const ok = await confirm({
      title: 'حذف الصنف',
      message: `سيتم حذف صنف «${category.name}». المنتجات المرتبطة به ستبقى بدون صنف.`,
      confirmLabel: 'حذف الصنف',
    })
    if (!ok) return
    const result = await adminApi.remove('categories', category.id)
    if (result.ok) {
      toast.success('تم حذف الصنف.')
      setRefreshTrigger((prev) => prev + 1)
      syncNow()
    } else {
      toast.error(result.message)
    }
  }

  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  if (!categories) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="h-8 w-8 text-emerald-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <SearchIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن صنف…"
            className="pr-10"
          />
        </div>
        <Button onClick={openCreate}>
          <PlusIcon className="h-4 w-4" />
          إضافة صنف جديد
        </Button>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
        عرض {filtered.length} من أصل {categories.length} صنف
      </p>

      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-start">
            <thead className="border-b border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-950/40">
              <tr>
                <Th>الصنف</Th>
                <Th>الأيقونة</Th>
                <Th>آخر تحديث</Th>
                <Th className="text-end">إجراءات</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-white/10">
              {filtered.map((category) => (
                <tr key={category.id} className="transition hover:bg-slate-50 dark:hover:bg-white/5">
                  <Td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <TagIcon className="h-5 w-5" />
                      </span>
                      <p className="font-bold text-slate-900 dark:text-white">{category.name}</p>
                    </div>
                  </Td>
                  <Td>
                    {category.icon ? (
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {category.icon}
                      </span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </Td>
                  <Td className="text-xs text-slate-400 dark:text-slate-500">
                    {new Date(category.updated_at).toLocaleDateString('ar')}
                  </Td>
                  <Td>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" onClick={() => openEdit(category)} title="تعديل">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => handleDelete(category)} title="حذف">
                        <TrashIcon className="h-4 w-4 text-rose-500" />
                      </Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-6">
            <EmptyState title="لا توجد أصناف" description="أضف أول صنف لتنظيم المنتجات." />
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal
          title={editing ? `تعديل صنف «${editing.name}»` : 'إضافة صنف جديد'}
          onClose={() => setModalOpen(false)}
        >
          <div className="space-y-5 px-6 py-6">
            <Field label="اسم الصنف *">
              <TextInput value={form.name} onChange={set('name')} placeholder="مثال: مشروبات" />
            </Field>
            <Field label="الأيقونة (اختياري)">
              <TextInput value={form.icon} onChange={set('icon')} placeholder="مثال: cup" />
            </Field>
            <div className="flex justify-end gap-2 border-t border-slate-200/70 pt-5 dark:border-white/10">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSave} disabled={saving || !form.name.trim()}>
                {saving ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    جارِ الحفظ…
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4" />
                    حفظ
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {dialog}
    </div>
  )
}
