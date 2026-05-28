import { useEffect, useState } from "react"
import type { Todo } from "./types/Todo"
import TodoForm from "./components/TodoForm";
import {Moon, Sun} from "lucide-react"
import { buttonStyle } from "./styles/ButtonStyle";
import TodoTask from "./components/TodoTask";

type TodoFilter = "all" | "completed" | "pending";

const filterLabels: Record<TodoFilter, string> = {
  all: "Todas",
  completed: "Concluídas",
  pending: "Pendentes",
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    const parsed: unknown = savedTodos ? JSON.parse(savedTodos) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((t: any) => ({
      id: t.id,
      title: t.title ?? "",
      description: t.description ?? "",
      completed: Boolean(t.completed),
    })) as Todo[];
  })
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [editingId, setEditingID] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [enteringTodoIds, setEnteringTodoIds] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("themeMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const resetForm = () => {
    setError("");
    setTitle("");
    setDescription("");
    setEditingID(null);
  };

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
      resetForm();
    } else {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        completed: false
      }
      setTodos([...todos, newTodo]);
      setEnteringTodoIds((prev) => new Set(prev).add(newTodo.id));
      window.setTimeout(() => {
        setEnteringTodoIds((prev) => {
          const next = new Set(prev);
          next.delete(newTodo.id);
          return next;
        });
      }, 400);
      resetForm();
    }
  }

  const handleEdit = (todo: Todo) => {
    setEditingID(todo.id);
    setTitle(todo.title);
    setDescription(todo.description || "");
    setError("");
  }

  const handleCancel = () => {
    resetForm();
  }

  const handleDelete = (id: number) => {
    const filtered = todos.filter(todo => 
      todo.id !== id
    )
    setTodos(filtered);
    resetForm();
  }

  const handleDeleteAll = () => {
    if (todos.length === 0) {
      setError("Não há tarefas para excluir");
      return;
    }
    setTodos([]);
    resetForm();
  }

  const handleToggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
    setError("");
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = totalCount - completedCount;

  const taskCounts = [
    { label: "Total", value: totalCount },
    { label: "Concluídas", value: completedCount },
    { label: "Pendentes", value: pendingCount },
  ] as const;

  const filterBtnClass = (active: boolean) =>
    `${buttonStyle} bg-blue-50 dark:bg-[#242320] px-3 py-2 sm:px-4 sm:py-2.5 font-medium text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-white cursor-pointer hover:border-red-500 dark:hover:border-blue-300 sm:hover:translate-y-1 transition-all duration-300 touch-manipulation ${
      active ? "border-[#FF8303] dark:border-blue-300" : ""
    }`;

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
        setError={setError}
        hasTodos={todos.length > 0}
      />

      {error && (
        <div
          key={error}
          role="alert"
          className="mx-auto mt-4 sm:mt-6 px-4 py-3 sm:px-6 sm:py-4 md:py-5 w-[calc(100%-2rem)] max-w-2xl border-2 border-red-500 dark:border-red-400 rounded-sm bg-red-50 dark:bg-red-950/50 shadow-sm animate-[alert-enter_0.3s_ease-out_forwards]"
        >
          <p className="text-center font-bold text-red-600 dark:text-red-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-snug">
            {error}
          </p>
        </div>
      )}

      {todos.length > 0 && (
        <>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-2xl mx-auto px-4 mt-4 sm:mt-6">
          {taskCounts.map(({ label, value }) => (
            <div
              key={label}
              className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] px-4 py-2 sm:px-5 sm:py-3 min-w-[96px] sm:min-w-[120px] flex-1 sm:flex-none text-center`}
            >
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                {label}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-2xl mx-auto px-4 mt-3 sm:mt-4">
          {(["all", "completed", "pending"] as const).map((filterOption) => (
            <button
              key={filterOption}
              type="button"
              onClick={() => setFilter(filterOption)}
              className={filterBtnClass(filter === filterOption)}
            >
              {filterLabels[filterOption]}
            </button>
          ))}
        </div>
        </>
      )}

      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          className={enteringTodoIds.has(todo.id) ? "animate-[task-enter_0.35s_ease-out_forwards]" : ""}
        >
          <TodoTask 
            todo={todo}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            handleAddTodo={handleAddTodo}
            handleEdit={handleEdit}
            handleToggleCompleted={handleToggleCompleted}
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