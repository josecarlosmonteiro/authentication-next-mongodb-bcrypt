'use client'

import { toast } from 'react-toastify';

export function useToast() {
  const displayToast = (message: string) => {
    toast(
      <div>
        {message}
      </div>
    )
  }

  return { displayToast };
}