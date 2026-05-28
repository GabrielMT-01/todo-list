import { useState } from "react";
import { buttonStyle } from "../styles/ButtonStyle";
import type { Todo } from "../types/Todo";
import {X, Share2, BookOpenText, Pencil } from "lucide-react"


type TodoTaskProps = {
    todo: Todo;
    handleAddTodo: (e: React.SyntheticEvent) => void;
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    handleDelete: (id: number) => void;
    handleCancel: () => void;
    handleEdit: (todo: Todo) => void;
}

function TodoTask ({todo, handleDelete, handleCancel, handleEdit, handleAddTodo, title, description, setTitle, setDescription}: TodoTaskProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isRemoveTaskSelected, setIsRemoveTaskSelected] = useState<boolean>(false);
    const [isEditSelected, setIsEditSelected] = useState<boolean>(false);
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
                            <button className={`${buttonStyle} hover:border-red-500 dark:hover:border-blue-300 transition duration-300 xl:p-2 2xl:p-2 cursor-pointer`} onClick={(e) => {
                                e.stopPropagation();
                                setIsRemoveTaskSelected(true);
                            }}>
                                <X color="#FF8303"/>
                            </button>
                        </div>
            
                </div>
                
                    {isSelected && (
                        <div className="flex justify-end gap-3 w-[70%] m-auto mt-4 text-gray-600 dark:text-white">
                            <button className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] p-1 xl:p-2 2xl:p-4 hover:border-red-500 dark:hover:border-blue-300 hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 cursor-pointer`}><Share2 /></button>

                            <button className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] p-1 xl:p-2 2xl:p-4 hover:border-red-500 dark:hover:border-blue-300 hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 cursor-pointer`}><BookOpenText  /></button>

                            <button onClick={() => {
                                setIsEditSelected(true);
                                handleEdit(todo);
                            }}  className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] p-1 xl:p-2 2xl:p-4 hover:border-red-500 dark:hover:border-blue-300 hover:-translate-y-1 hover:translate-x-0.5 transition-all duration-300 cursor-pointer`} ><Pencil /></button>
                        </div>
                    )}

                    {isRemoveTaskSelected && (
                        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                            <div className="relative bg-[#242320] rounded-lg shadow-xl w-full max-w-lg z-10 m-4">
                                 <div className={`bg-amber-100 dark:bg-gray-900 transition:bg duration-300 p-10 ${buttonStyle}`}>
                                         <p className="text-3xl text-center text-gray-700 font-bold dark:text-white">Deseja excluir essa tarefa?</p>
                                     <div className="flex gap-4 justify-center pt-5">
                                         <button className={`${buttonStyle} p-1 font-medium text-sm md:text-xl text-gray-700 cursor-pointer
                                            dark:text-white
                                         md:hover:border-red-500
                                         md:dark:hover:border-blue-50 
                                           md:hover:translate-y-1 
                                           transition-all 
                                           duration-300`} onClick={() => {

                                            handleCancel;
                                            setIsRemoveTaskSelected(false);

                                         }}>Cancelar</button>
                                         <button className={`${buttonStyle} p-1 font-medium text-sm md:text-xl text-gray-700 cursor-pointer
                                            dark:text-white 
                                            lg:hover:border-red-500 
                                            lg:dark:hover:border-blue-50 
                                            md:hover:translate-y-1 
                                            transition-all 
                                            duration-300`} onClick={() => {
                                            handleDelete(todo.id);
                                            setIsRemoveTaskSelected(false);
                                         
                                         } }>
                                            Excluir Tarefa
                                         </button>
                                     </div>
                                 </div>

                            </div>
                        </div>
                    )}

                    {isEditSelected && (
                        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                            <div className="relative  rounded-lg shadow-xl w-full max-w-lg z-10 m-4">
                                <div className={`bg-amber-100 dark:bg-gray-900 transition:bg duration-300 p-10 ${buttonStyle}`}>
                                    <form onSubmit={(e) => {
                                        handleAddTodo(e);
                                        setIsEditSelected(false);
                                    }} >
                                        
                                        <div className="flex flex-col gap-5">
                                            <input
                                                className={`${buttonStyle} bg-blue-50
                                                    dark:bg-[#242320]
                                                    text-black
                                                    dark:text-white
                                                    h-10
                                                    md:h-15
                                                    pl-3
                                                    font-bold
                                                    text-base
                                                    lg:text-lg
                                                    
                                                    xl:text-xl
                                                    2xl:text-2xl
                                                `}
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <textarea
                                                className={`${buttonStyle} bg-blue-50
                                                    dark:bg-[#242320]
                                                    text-black
                                                    dark:text-white
                                                    h-10
                                                    md:h-25
                                                    pl-3
                                                    font-bold
                                                    text-base
                                                    lg:text-lg
                                                    xl:text-xl
                                                    2xl:text-2xl
                                                `}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <div className="flex justify-center gap-5">
                                                <button 
                                                    className={`${buttonStyle}  w-[100px] h-10 lg:w-[200px] font-medium text-sm md:text-xl text-gray-700 cursor-pointer
                                                        dark:text-white 
                                                        lg:hover:border-red-500 
                                                        lg:dark:hover:border-blue-50 
                                                        md:hover:translate-y-1 
                                                        transition-all 
                                                        duration-300`}
                                                    onClick={() => {
                                                    handleCancel();
                                                    setIsEditSelected(false);
                                                }} type="button">Cancelar</button>
                                                <button
                                                    className={`${buttonStyle} w-[100px] h-10 lg:w-[200px] font-medium text-sm md:text-xl text-gray-700 cursor-pointer
                                                        dark:text-white 
                                                        lg:hover:border-red-500 
                                                        lg:dark:hover:border-blue-50 
                                                        md:hover:translate-y-1 
                                                        transition-all 
                                                        duration-300`}
                                                    type="submit">Salvar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                
        </>
       
        
    )
}

export default TodoTask