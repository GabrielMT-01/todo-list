import type { ReactNode } from "react";
import { buttonStyle } from "../styles/ButtonStyle";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    panelClassName?: string;
};

function Modal({ isOpen, onClose: _onClose, children, panelClassName = "" }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-3 sm:p-4 animate-[fade-in_0.3s_ease-out_forwards]">
            <div className={`relative rounded-lg shadow-xl w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto animate-[slide-up-in_0.3s_ease-out_forwards] ${panelClassName}`}>
                <div className={`bg-amber-100 dark:bg-gray-900 transition:bg duration-300 p-5 sm:p-8 md:p-10 ${buttonStyle}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
