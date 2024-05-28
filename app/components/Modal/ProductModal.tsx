"use client";

import React, { ChangeEvent, useState } from "react";
interface productModalProps {
  onClose: () => void;
  isUpdate?: boolean;
  products?: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
}
const ProductModal: React.FC<productModalProps> = ({
  onClose,
  isUpdate,
  products,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: products?.title || "",
    description: products?.description || "",
    price: products?.price || 0,
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseInt(value, 10) : value,
    }));
  };

  // POST API
  const HandlePostApi = async () => {
    try {
      if (!formData.title || !formData.price || !formData.description) {
        setError("Plese Fill All Fields");
        return;
      }
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        ...formData,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3000/api", requestOptions);
      setFormData({ title: "", description: "", price: 0 });
      alert("Products Created");
      onClose();
    } catch (error) {
      console.log("Error While Creating Products", error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE API

  const HandleUpdateApi = async () => {
    try {
      if (!formData.title || !formData.price || !formData.description) {
        setError("Plese Fill All Fields");
        return;
      }
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: products?.id,

        ...formData,
      });

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3000/api", requestOptions);
      onClose();
    } catch (error) {
      console.log("Error While Updating Products", error);
    }
  };

  // Form Submission
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      HandleUpdateApi();
    } else {
      HandlePostApi();
    }
  };
  return (
    <div className="bg-black/40 h-screen w-screen absolute inset-0">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white/40 bg px-4 py-8 rounded-lg shadow-md max-w-xl min-w-[500px] ">
          <h1 className="text-center text-2xl font-bold">
            {isUpdate ? "Update Products" : "Add Products"}
          </h1>
          <form className="py-4" onSubmit={HandleSubmit}>
            <div className="flex flex-col py-2">
              <label className="text-lg">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="px-2 py-1 rounded-md outline-none focus:ring-1 ring-inset focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="text-lg">Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="px-2 py-1 rounded-md outline-none focus:ring-1 ring-inset focus:ring-red-500"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="text-lg">Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="px-2 py-1 rounded-md outline-none focus:ring-1 ring-inset focus:ring-red-500"
              />
            </div>
            <span className="text-sm text-red-600 italic my-2">{error}</span>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-sm hover:bg-blue-600 transition-all text-white w-24 px-3 py-1 rounded"
              >
                {loading ? "loading..." : isUpdate ? "Update" : "Add"}
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-sm hover:bg-red-600 transition-all text-white w-24 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
