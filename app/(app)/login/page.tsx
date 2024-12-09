import { LoginForm } from "@/app/components/forms/LoginForm";

export default async function Login() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="p-4 rounded shadow bg-gray-800">
        <h2 className="text-2xl">Entrar</h2>
        <hr /><br />

        <LoginForm />
      </div>
    </main>
  )
}