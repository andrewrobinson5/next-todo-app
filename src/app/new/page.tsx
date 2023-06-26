import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf()
  if (typeof title !== "string" || title.length === 0) throw new Error("Invalid Title")
  
  await prisma.todo.create({ data: { title, complete: false } })
  redirect("/")
}

export default function Page() {
  return (
    <>
      <header className="py-4 flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">New</h1>
        <Link href=".." className=" text-slate-400 hover:border-white hover:text-white focus-within:border-white focus-within:text-white duration-300">← return home</Link>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input type="text" name="title" className="border border-slate-300 bg-transparent
          rounded-sm px-2 py-1 outline-none focus-within:border-slate-100" />
        <div className="flex gap-1 justify-end">
          <Link href=".." className="border border-slate-300 text-slate-300 px-3 py-2 rounded-sm
          hover:border-white hover:text-white focus-within:border-white focus-within:text-white duration-300">Cancel</Link>
          <button type="submit" className="border border-slate-300 text-slate-300 px-3 py-2 rounded-sm
          hover:border-white hover:text-white focus-within:border-white focus-within:text-white duration-300">Create</button>
        </div>
      </form>
    </>
  )
}