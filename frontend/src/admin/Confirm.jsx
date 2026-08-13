import { useCallback, useState } from 'react'

import Modal from './Modal.jsx'
import { Button } from './ui.jsx'
import { TrashIcon } from '../components/icons.jsx'

export function useConfirm() {
  const [state, setState] = useState(null)

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({ ...options, resolve })
    })
  }, [])

  const handleClose = useCallback((value) => {
    setState((current) => {
      if (current?.resolve) {
        current.resolve(value)
      }
      return null
    })
  }, [])

  const dialog = state ? (
    <Modal title={state.title || 'تأكيد العملية'} onClose={() => handleClose(false)}>
      <div className="px-6 py-5">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
            <TrashIcon className="h-5 w-5" />
          </span>
          <p className="pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {state.message}
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => handleClose(false)}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={() => handleClose(true)}>
            {state.confirmLabel || 'تأكيد الحذف'}
          </Button>
        </div>
      </div>
    </Modal>
  ) : null

  return { confirm, dialog }
}
