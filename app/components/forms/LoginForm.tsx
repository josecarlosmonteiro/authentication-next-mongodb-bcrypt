'use client'

import { login } from "@/app/(app)/login/actions"
import { SubmitFormButton } from "./SubmitFormButton"
import Link from "next/link";
import { useActionState } from "react";

export function LoginForm() {
  const [state, formAction] = useActionState(login, { message: '' });

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <div className="text-red-500 italic font-medium text-sm">{state?.message}</div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@mail.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha *</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="user@mail.com"
            required
          />
        </div>

        <Link href={'/cadastro'}>
          <div className="w-full text-center text-blue-500 underline">
            Cadastre-se
          </div>
        </Link>

        <SubmitFormButton type="submit" className="p-2 w-full rounded shadow bg-gray-100">
          Entrar
        </SubmitFormButton>
      </div>
    </form>
  )
}