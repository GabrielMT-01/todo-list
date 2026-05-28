import { useEffect, useState } from "react"
import type { Todo } from "./types/Todo"
import TodoForm from "./components/TodoForm";
import {Moon, Sun} from "lucide-react"
import { buttonStyle } from "./styles/ButtonStyle";
import TodoTask from "./components/TodoTask";

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

    if (editingId !== null) {
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
    <div className={`${darkMode ? "dark" : ""} pb-10 bg-amber-100 min-h-screen dark:bg-gray-900 transition:bg duration-300 `}>
      <div className="flex justify-end p-5">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className={`bg-blue-50 dark:bg-[#242320] hover:border-red-500 dark:hover:border-blue-300 hover:translate-y-1 transition-all duration-300 flex cursor-pointer  w-10 h-10 items-center justify-center text-[#FF8303] 2xl:h-15 2xl:w-15 ${buttonStyle}`}>

          {darkMode ? <Moon size={23} strokeWidth={3}/> : <Sun size={23} strokeWidth={3} />}
        </button>
      </div>
      <h1 className="text-3xl xl:text-4xl 2xl:text-5xl mt-5 font-bold text-center text-gray-700 dark:text-white transition:text duration-500">TO-DO List</h1>
      <TodoForm 
        handleAddTodo={handleAddTodo}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleDeleteAll={handleDeleteAll}
        
      />

      {todos.map(todo => (
        <div>
          <TodoTask 
            todo={todo}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            handleAddTodo={handleAddTodo}
            handleEdit={handleEdit}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />  
        </div>
      ))}

      
    </div>
  )
}

export default App