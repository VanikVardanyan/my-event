import React from 'react'
import toast from 'react-hot-toast'

import { Toast } from '../ui/toast'
import { TOAST_VARIANT } from '../ui/toast/types'
import { getErrorMessageByCode, HTTPResponseStatusCodes } from './error-message-by-code'

const errorToast = (t: { id?: string }, code: HTTPResponseStatusCodes) => {
  return (
    <Toast content={getErrorMessageByCode(code)} onClose={() => toast.dismiss(t.id)} variant={TOAST_VARIANT.warning} />
  )
}

export default errorToast
