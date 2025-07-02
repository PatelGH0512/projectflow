import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-fadeIn w-full max-w-2xl rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-gray-700 dark:bg-white/5">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow transition-transform duration-200 hover:scale-105"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
