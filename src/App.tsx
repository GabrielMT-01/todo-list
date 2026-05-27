import { useEffect, useState } from "react"
import type { Todo } from "./types/Todo"
import TodoForm from "./components/TodoForm";
import {Moon, Sun} from "lucide-react"
import { buttonStyle } from "./styles/ButtonStyle";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos? JSON.parse(savedTodos) : []
  })
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [editingId, setEditingID] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  
  const handleAddTodo = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Digite um titulo");
      return;
    }

    const alreadyExist = todos.some(todo => 
      todo.title.toLowerCase() === title.toLowerCase() &&
      todo.id !== editingId
    )

    if (alreadyExist) {
      setError("Esse titulo já existe");
      return;
    }

    if (editingId) {
      const updated = todos.map(todo => 
        todo.id === editingId ? {...todo, title, description} : todo
      )
      setTodos(updated);
      setError("");
      setTitle("");
      setDescription("");
      setEditingID(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title,
        description
      }
      setTodos([...todos, newTodo]);
      setError("");
      setTitle("");
      setDescription("");
      setEditingID(null);
    }
  }

  const handleEdit = (todo: Todo) => {
    setEditingID(todo.id);
    setTitle(todo.title);
    setDescription(todo.description || "");
    setError("");
  }

  const handleCancel = () => {
    setError("");
    setTitle("");
    setDescription("");
    setEditingID(null);
  }

  const handleDelete = (id: number) => {
    const filtered = todos.filter(todo => 
      todo.id !== id
    )
    setTodos(filtered);
    setError("");
    setTitle("");
    setDescription("");
    setEditingID(null);
  }

  const handleDeleteAll = () => {
    setTodos([]);
    setError("");
    setTitle("");
    setDescription("");
    setEditingID(null);
  }


  
  
  return(
    <div className={`${darkMode ? "dark" : ""} bg-amber-100 h-screen dark:bg-gray-900 transition:bg duration-300`}>
      <div className="flex justify-end p-5">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className={`hover:border-blue-300 hover:translate-y-1 transition-all duration-300 flex cursor-pointer  w-10 h-10 items-center justify-center text-[#FF8303] ${buttonStyle}`}>

          {darkMode ? <Moon size={23} strokeWidth={3}/> : <Sun size={23} strokeWidth={3} />}
        </button>
      </div>
      <TodoForm 
        handleAddTodo={handleAddTodo}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleDeleteAll={handleDeleteAll}
        
      />
    </div>
  )
}

export default App