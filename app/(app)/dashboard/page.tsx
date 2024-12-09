import { deleteSession, verifySession } from "@/app/libs/sessions";
import { getUsers } from "./actions"

export default async function Dashboard() {
  const users = await getUsers();
  const { userId, username } = await verifySession();

  async function logout() {
    'use server'

    await deleteSession();
  }

  return (
    <main className="p-4">
      <div className="p-1 flex justify-between items-center">
        <h2 className="text-2xl">Dashboard page</h2>
        <button
          type="button"
          className="shadow rounded p-1 px-4 border border-red-500 text-red-500"
          onClick={logout}
        >
          Sair
        </button>
      </div>
      <hr /><br />

      <div>Usuário logado: {username} ({userId})</div>
      <br />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  )
}