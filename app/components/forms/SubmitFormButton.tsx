'use client'

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom"

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitFormButton({ disabled, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-gray-700 hover:bg-gray-600 duration-200 rounded shadow p-2 px-4 disabled:opacity-50"
      disabled={disabled || pending}
    >
      {pending ? 'Carregando...' : children}
    </button>
  )
}