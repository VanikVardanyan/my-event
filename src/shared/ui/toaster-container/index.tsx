import React from 'react'
import { Toaster } from 'react-hot-toast'

// documentation
// https://react-hot-toast.com/docs

export const ToastContainer = () => (
  <Toaster
    position="bottom-left"
    reverseOrder={true}
    containerStyle={{
      bottom: 28,
      left: 28,
    }}
    toastOptions={{
      duration: 5000,
      style: {},
    }}
  />
)
