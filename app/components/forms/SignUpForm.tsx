'use client'

import { signUp } from "@/app/(app)/cadastro/actions";
import { SubmitFormButton } from "./SubmitFormButton";
import { useActionState } from "react";

export function SignUpForm() {
  const [state, formAction] = useActionState(signUp, { message: '' });

  return (
    <div className="p-4 rounded shadow-md bg-gray-800">
      <h2 className="text-xl">Cadastro</h2>
      <hr /><br />

      <form action={formAction}>
        <div className="flex flex-col gap-4">
          {
            state?.message &&
            <p className="text-red-500 italic">{state.message}</p>
          }
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Nome do usuário*:</label>
            <input name="username" type="text" placeholder="Nome do Usuário..." required />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email*:</label>
            <input name="email" type="email" placeholder="user@mail.com" required />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Senha*:</label>
            <input name="password" type="password" placeholder="********" required />
          </div>

          <SubmitFormButton type="submit" className="p-2 w-full bg-gray-200 shadow">
            Concluir
          </SubmitFormButton>
        </div>
      </form>
    </div>
  )
}