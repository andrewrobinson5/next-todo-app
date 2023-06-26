"use client"

type TodoItemProps = {
  id: string,
  title: string,
  complete: boolean,
  toggleTodo: (id: string, complete: boolean) => void,
  deleteTodo: (id: string) => void,
}
export function TodoItem({ id, title, complete, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center justify-between
      p-2 my-1 border rounded-lg border-slate-700">
      <div className="flex gap-2">
        <input id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={e => {toggleTodo(id, e.target.checked); window.location.replace("/")}}
          />
        <label htmlFor={id} className="peer-checked:line-through peer-checked:text-slate-500 text-2xl">{title}</label>
      </div>
      <button onClick={e => deleteTodo(id)} className="text-red-700 border border-red-700 px-3 py-1 rounded-lg
      hover:border-red-500 hover:text-red-500 focus-within:border-red-500 focus-within:text-red-500 duration-300">
        &#128465;
      </button>
    </li>
  )
}