import { useEffect, useRef, useState } from "react";
import { buttonStyle } from "../styles/ButtonStyle";
import type { Todo } from "../types/Todo";
import {X, Share2, BookOpenText, Pencil, Circle, CheckCircle2, Check } from "lucide-react"
import Modal from "./Modal";


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
    handleToggleCompleted: (id: number) => void;
}

function TodoTask ({todo, handleDelete, handleCancel, handleEdit, handleAddTodo, title, description, setTitle, setDescription, handleToggleCompleted}: TodoTaskProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isRemoveTaskSelected, setIsRemoveTaskSelected] = useState<boolean>(false);
    const [isEditSelected, setIsEditSelected] = useState<boolean>(false);
    const [isViewSelected, setIsViewSelected] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeoutRef = useRef<number | null>(null);
    const btnBg = "bg-blue-50 dark:bg-[#242320]";
    const actionBtnClass = `${buttonStyle} ${btnBg} p-2 sm:p-3 hover:border-red-500 dark:hover:border-blue-300 sm:hover:-translate-y-1 sm:hover:translate-x-0.5 transition-all duration-300 cursor-pointer touch-manipulation shrink-0`;
    const modalBtnClass = `${buttonStyle} ${btnBg} w-full sm:w-auto px-4 py-2.5 font-medium text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 cursor-pointer dark:text-white sm:hover:border-red-500 sm:dark:hover:border-blue-50 sm:hover:translate-y-1 transition-all duration-300 touch-manipulation`;
    const actionRevealClass = (delay: string, extra = "") =>
        `${actionBtnClass} transition-all duration-300 ease-out ${delay} ${extra} ${
            isSelected ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`;

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    const handleShare = async () => {
        const text = todo.description?.trim()
            ? `${todo.title}\n${todo.description}`
            : todo.title;

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current);
            }
            copyTimeoutRef.current = window.setTimeout(() => setIsCopied(false), 2000);
        } catch {
            setIsCopied(false);
        }
    };

    return(
        <>         
                <div
                    onClick={() => setIsSelected(!isSelected)}
                    className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] transition-all duration-300 w-full max-w-2xl mx-auto px-4 mt-4 sm:mt-6 md:mt-8 min-h-[72px] sm:min-h-[88px] md:h-[100px] flex items-center justify-between gap-2 py-3 sm:py-0 cursor-pointer ${
                        isSelected ? "border-[#FF8303] dark:border-blue-300" : ""
                    }`}
                >
                        <div className="flex flex-col justify-center min-w-0 flex-1 gap-0.5">
                            <h2
                                className={`pl-1 sm:pl-2 text-gray-700 dark:text-white text-lg sm:text-2xl md:text-3xl font-medium truncate transition-all duration-300 ${
                                    todo.completed ? "line-through opacity-60" : ""
                                }`}
                            >
                                {todo.title}
                            </h2>
                            {todo.description?.trim() && (
                                <p
                                    className={`pl-1 sm:pl-2 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 truncate transition-all duration-300 ${
                                        todo.completed ? "line-through opacity-60" : ""
                                    }`}
                                >
                                    {todo.description}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-center shrink-0 sm:hover:-translate-y-1 sm:hover:translate-x-0.5 transition-all duration-300">
                            <button
                                type="button"
                                aria-label="Excluir tarefa"
                                className={`${buttonStyle} ${btnBg} p-2 sm:p-2.5 hover:border-red-500 dark:hover:border-blue-300 transition duration-300 cursor-pointer touch-manipulation`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRemoveTaskSelected(true);
                                }}
                            >
                                <X color="#FF8303" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                </div>
                
                    <div
                        className={`flex justify-end flex-wrap gap-2 sm:gap-3 w-full max-w-2xl mx-auto px-4 overflow-hidden text-gray-600 dark:text-white transition-all duration-300 ease-out ${
                            isSelected
                                ? "mt-3 sm:mt-4 max-h-24 opacity-100"
                                : "mt-0 max-h-0 opacity-0 pointer-events-none"
                        }`}
                    >
                        <button
                            type="button"
                            aria-label={isCopied ? "Copiado para a área de transferência" : "Compartilhar tarefa"}
                            className={actionRevealClass(
                                "delay-0",
                                isCopied ? "border-green-500 dark:border-green-400" : ""
                            )}
                            onClick={handleShare}
                        >
                            {isCopied ? (
                                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                            ) : (
                                <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>

                        <button
                            type="button"
                            aria-label={todo.completed ? "Desconcluir tarefa" : "Concluir tarefa"}
                            className={actionRevealClass("delay-75")}
                            onClick={() => handleToggleCompleted(todo.id)}
                        >
                            {todo.completed ? (
                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Circle className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>

                        <button
                            type="button"
                            aria-label="Ver detalhes da tarefa"
                            className={actionRevealClass("delay-150")}
                            onClick={() => setIsViewSelected(true)}
                        >
                            <BookOpenText className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <button
                            type="button"
                            aria-label="Editar tarefa"
                            className={actionRevealClass("delay-200")}
                            onClick={() => {
                                setIsEditSelected(true);
                                handleEdit(todo);
                            }}
                        >
                            <Pencil className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    <Modal
                        isOpen={isRemoveTaskSelected}
                        onClose={() => setIsRemoveTaskSelected(false)}
                        panelClassName="bg-[#242320]"
                    >
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-gray-700 font-bold dark:text-white leading-snug">Deseja excluir essa tarefa?</p>
                        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-center pt-5">
                            <button
                                type="button"
                                className={modalBtnClass}
                                onClick={() => {
                                    handleCancel();
                                    setIsRemoveTaskSelected(false);
                                }}
                            >Cancelar</button>
                            <button
                                type="button"
                                className={modalBtnClass}
                                onClick={() => {
                                    handleDelete(todo.id);
                                    setIsRemoveTaskSelected(false);
                                }}
                            >
                                Excluir Tarefa
                            </button>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={isViewSelected}
                        onClose={() => setIsViewSelected(false)}
                    >
                        <p className="text-xl sm:text-2xl md:text-3xl text-center text-gray-700 font-bold dark:text-white mb-4 sm:mb-6">
                            Detalhes da tarefa
                        </p>
                        <div className="flex flex-col gap-4 sm:gap-5">
                            <input
                                readOnly
                                value={todo.title}
                                className={`${buttonStyle} ${btnBg}
                                    text-black
                                    dark:text-white
                                    w-full
                                    min-h-[48px]
                                    sm:min-h-[56px]
                                    pl-3
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                    lg:text-2xl
                                    2xl:text-3xl
                                    cursor-default
                                `}
                            />
                            <textarea
                                readOnly
                                value={todo.description || ""}
                                rows={6}
                                className={`${buttonStyle} ${btnBg}
                                    text-black
                                    dark:text-white
                                    w-full
                                    min-h-[160px]
                                    sm:min-h-[200px]
                                    pl-3
                                    pt-2
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                    lg:text-2xl
                                    2xl:text-3xl
                                    resize-none
                                    cursor-default
                                `}
                            />
                            <div className="flex justify-center pt-2">
                                <button
                                    type="button"
                                    className={`${modalBtnClass} sm:w-[120px] md:w-[160px] lg:w-[200px] h-11 sm:h-12`}
                                    onClick={() => setIsViewSelected(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={isEditSelected}
                        onClose={() => setIsEditSelected(false)}
                    >
                        <form onSubmit={(e) => {
                            handleAddTodo(e);
                            setIsEditSelected(false);
                        }} >
                            <div className="flex flex-col gap-4 sm:gap-5">
                                <input
                                    className={`${buttonStyle} ${btnBg}
                                        text-black
                                        dark:text-white
                                        w-full
                                        h-11
                                        sm:h-12
                                        pl-3
                                        font-bold
                                        text-lg
                                        sm:text-xl
                                        lg:text-2xl
                                        2xl:text-3xl
                                    `}
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea
                                    className={`${buttonStyle} ${btnBg}
                                        text-black
                                        dark:text-white
                                        w-full
                                        min-h-[100px]
                                        sm:min-h-[120px]
                                        pl-3
                                        pt-2
                                        font-bold
                                        text-lg
                                        sm:text-xl
                                        lg:text-2xl
                                        2xl:text-3xl
                                        resize-y
                                    `}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 sm:gap-5">
                                    <button 
                                        className={`${modalBtnClass} sm:w-[120px] md:w-[160px] lg:w-[200px] h-11 sm:h-12`}
                                        onClick={() => {
                                        handleCancel();
                                        setIsEditSelected(false);
                                    }} type="button">Cancelar</button>
                                    <button
                                        className={`${modalBtnClass} sm:w-[120px] md:w-[160px] lg:w-[200px] h-11 sm:h-12`}
                                        type="submit">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                
        </>
       
        
    )
}

export default TodoTask