import { TodoItem } from "@/components/TodoItem"
import { prisma } from "@/db"
import Link from "next/link"

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"
  if (typeof id !== "string" || id.length === 0) throw new Error("Invalid ID")
  await prisma.todo.update({ where: { id }, data: { complete } })
}

async function deleteTodo(id: string) {
  "use server"
  if (typeof id !== "string" || id.length === 0) throw new Error("Invalid ID")
  await prisma.todo.delete({where: { id }})
  //TODO: Trigger refresh on delete
}

export default async function Home() {
  const todos = await getTodos()

  return <>
    <header className="py-4 flex justify-between items-center mb-4">
      <h1 className="text-4xl font-semibold">Todos</h1>
      <Link href="/new" className="text-lg border border-slate-300 text-slate-300 px-3 py-2 rounded-lg
        hover:border-white hover:text-white focus-within:border-white focus-within:text-white duration-300">New Todo</Link>
    </header>
    <ul className="max-w-3xl m-auto">
      {todos.map(todo =>(
        <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      ))}
    </ul>
  </>
}