import {Plus, Trash} from "lucide-react"
import { buttonStyle } from "../styles/ButtonStyle";

type todoFormProps = {
    handleAddTodo: (e: React.SyntheticEvent) => void;
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    handleDeleteAll: () => void;
}

function TodoForm ({handleAddTodo, title, setTitle, description, setDescription, handleDeleteAll}: todoFormProps) {
    return(
        <form onSubmit={handleAddTodo}>
            <div className="sm:flex sm:w-[70%] sm: m-auto sm:items-center 2xl:gap-10">
                <div className="flex flex-col gap-2 max-w-[300px] sm:max-w-[350px] sm:w-[70%] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[850px] 2xl:max-w-[1000px]  m-auto pt-7">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className={`${buttonStyle}  text-black h-9 md:text-[1.3em] lg:h-13 lg:text-[1.3em] 2xl:h-20 pl-2 font-bold dark:text-white`}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className={`${buttonStyle} text-black pl-2 md:text-[1.3em] lg:h-30 lg:text-[1.3em] 2xl:h-45 font-bold dark:text-white`}
                    />
                </div>
                <div className="flex justify-center mt-6 gap-2 sm:gap-3 h-8 sm:flex-col sm:mr-10 ">
                    <button type="submit" className={`${buttonStyle} hover:border-blue-300 hover:translate-y-1 sm:hover:-translate-y-1 sm:hover:translate-x-1 transition-all duration-300 w-30 sm:w-15 sm:p-3 md:w-25 lg:w-35 lg:pb-6 lg:pt-6 2xl:w-[250px] 2xl:pb-12 2xl:pt-10   flex justify-center items-center cursor-pointer text-[#FF8303]`}> <Plus className="lg:w-7 lg:h-7 2xl:w-10 2xl:h-10" strokeWidth={3} size={19}/></button>


                    <button type="button" className={`${buttonStyle} hover:border-blue-300 hover:translate-y-1 sm:hover:-translate-y-1 sm:hover:translate-x-1 transition-all duration-300 w-30 sm:w-15 sm:p-3 md:w-25 lg:w-35 lg:pb-6 lg:pt-6 2xl:w-[250px] 2xl:pb-12 2xl:pt-10  flex justify-center items-center cursor-pointer text-[#FF8303]`}
                    onClick={handleDeleteAll}><Trash className="lg:w-7 lg:h-7 2xl:w-10 2xl:h-10" strokeWidth={3} size={18}/></button>
                </div>
            </div>
        </form>
    )
}

export default TodoForm