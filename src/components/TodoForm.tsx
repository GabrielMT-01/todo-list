import { useState } from "react";
import {Plus, Trash} from "lucide-react"
import { buttonStyle } from "../styles/ButtonStyle";
import Modal from "./Modal";

type todoFormProps = {
    handleAddTodo: (e: React.SyntheticEvent) => void;
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    handleDeleteAll: () => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
    hasTodos: boolean;
}

function TodoForm ({handleAddTodo, title, setTitle, description, setDescription, handleDeleteAll, setError, hasTodos}: todoFormProps) {
    const [isDeleteAllSelected, setIsDeleteAllSelected] = useState(false);
    const btnBg = "bg-blue-50 dark:bg-[#242320]";
    const modalBtnClass = `${buttonStyle} ${btnBg} w-full sm:w-auto px-4 py-2.5 font-medium text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 cursor-pointer dark:text-white sm:hover:border-red-500 sm:dark:hover:border-blue-50 sm:hover:translate-y-1 transition-all duration-300 touch-manipulation`;

    return(
        <>
        <form onSubmit={handleAddTodo} className="w-full">
            <div className="
                sm:flex
                sm:items-center
                gap-5
                w-full
                max-w-[1200px]
                mx-auto
                px-4
            ">
                <div className="
                    flex flex-col
                    gap-2
                    w-full
                    pt-7
                ">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className={`
                            ${buttonStyle}
                            bg-blue-50
                            dark:bg-[#242320]
                            text-black
                            dark:text-white
                            h-10
                            lg:h-12
                            pl-3
                            font-bold
                            text-base
                            lg:text-lg
                            xl:text-xl
                            2xl:text-2xl
                        `}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] text-black pl-2 md:text-[1.3em] lg:text-[1.3em] min-h-[120px]
                        lg:min-h-[180px] font-bold dark:text-white xl:text-xl
                        2xl:text-2xl`}
                    />
                </div>
                <div className="
                        flex
                        justify-center
                        gap-3
                        mt-6
                        sm:flex-col
                        sm:items-center
                    ">
                    <button type="submit" className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] hover:border-red-500 dark:hover:border-blue-300 hover:translate-y-1 sm:hover:-translate-y-1 sm:hover:translate-x-1 transition-all duration-300 w-full max-w-[140px] h-10 sm:h-25 sm:w-25 lg:pb-6 lg:pt-6 2xl:w-[250px] 2xl:pb-12 2xl:pt-10   flex justify-center items-center cursor-pointer text-[#FF8303]`}
                    > <Plus className="w-5 h-5 sm:w-10 sm:h-10" strokeWidth={3} size={19}/></button>


                    <button
                        type="button"
                        aria-label="Excluir todas as tarefas"
                        className={`${buttonStyle} bg-blue-50 dark:bg-[#242320] hover:border-red-500 dark:hover:border-blue-300 hover:translate-y-1 sm:hover:-translate-y-1 sm:hover:translate-x-1 transition-all duration-300   w-full max-w-[140px] h-10 sm:h-25 sm:w-25 lg:pb-6 lg:pt-6 2xl:w-[250px] 2xl:pb-12 2xl:pt-10  flex justify-center items-center cursor-pointer text-[#FF8303]`}
                        onClick={() => {
                            if (!hasTodos) {
                                setError("Não há tarefas para excluir");
                                return;
                            }
                            setError("");
                            setIsDeleteAllSelected(true);
                        }}
                    >
                        <Trash className="w-5 h-5 sm:w-10 sm:h-10" strokeWidth={3} size={18}/>
                    </button>
                </div>
            </div>
        </form>

        <Modal
            isOpen={isDeleteAllSelected}
            onClose={() => setIsDeleteAllSelected(false)}
            panelClassName="bg-[#242320]"
        >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-gray-700 font-bold dark:text-white leading-snug">
                Deseja excluir todas as tarefas?
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-center pt-5">
                <button
                    type="button"
                    className={modalBtnClass}
                    onClick={() => setIsDeleteAllSelected(false)}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className={modalBtnClass}
                    onClick={() => {
                        if (!hasTodos) {
                            setError("Não há tarefas para excluir");
                            setIsDeleteAllSelected(false);
                            return;
                        }
                        handleDeleteAll();
                        setIsDeleteAllSelected(false);
                    }}
                >
                    Excluir Todas
                </button>
            </div>
        </Modal>
        </>
    )
}

export default TodoForm