import { useState } from "react";
import { buttonStyle } from "../styles/ButtonStyle";
import type { Todo } from "../types/Todo";
import {X, Share2, BookOpenText, Pencil } from "lucide-react"


type TodoTaskProps = {
    todo: Todo;
    handleDelete: (id: number) => void
}

function TodoTask ({todo, handleDelete}: TodoTaskProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    return(
        <>         
                <div onClick={() => setIsSelected(!isSelected)} className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] transition-all duration-300 w-[70%] m-auto mt-8 h-[100px] flex items-center justify-between px-4`}>
            
                        <div className={`  flex flex-col justify-center w-[65%] h-full`}>
                            <h2 className="pl-2 text-gray-700 dark:text-white text-2xl font-medium truncate">{todo.title}</h2>
                            {todo.description?.trim() && (
                                <p className="pl-2 text-gray-700 dark:text-white truncate ">{todo.description}</p>
                            )}
                        </div>
                        <div className={`pr-2 flex items-center justify-center hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 `}>
                            <button className={`${buttonStyle} hover:border-red-500 dark:hover:border-blue-300 transition duration-300`} onClick={(e) => {
                                e.stopPropagation(), 
                                handleDelete(todo.id)}}>
                                <X color="#FF8303"/>
                            </button>
                        </div>
            
                </div>
                
                    {isSelected && (
                        <div className="flex justify-end gap-3 w-[70%] m-auto mt-2 text-gray-600 dark:text-white">
                            <button className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] p-1 hover:border-red-500 dark:hover:border-blue-300 hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 cursor-pointer`}><Share2 /></button>
                            <button className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] p-1 hover:border-red-500 dark:hover:border-blue-300 hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 cursor-pointer`}><BookOpenText  /></button>
                            <button className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] p-1 hover:border-red-500 dark:hover:border-blue-300 hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 cursor-pointer`}><Pencil /></button>
                        </div>
                    )}
                
        </>
       
        
    )
}

export default TodoTask