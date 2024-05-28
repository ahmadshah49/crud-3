"use client";
import React, { useState } from "react";
import ProductModal from "./ProductModal";
interface ModalProps {
  title: string;
  isUpdate?: boolean;
  products?: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
}
const Modal: React.FC<ModalProps> = ({ title, isUpdate, products }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const openModal = () => {
    setModelOpen(true);
  };
  const closeModal = () => {
    setModelOpen(false);
  };
  return (
    <div>
      <button
        className="bg-blue-500 text-sm hover:bg-blue-600 transition-all text-white px-3 py-1 rounded"
        onClick={openModal}
      >
        {title}
      </button>
      {modelOpen && <ProductModal products={products} isUpdate={isUpdate} onClose={closeModal} />}
    </div>
  );
};

export default Modal;
