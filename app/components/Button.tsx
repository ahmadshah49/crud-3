"use client";

import React, { useState } from "react";
interface id {
  id: string;
}
const Button: React.FC<id> = ({ id }) => {
  const [loading, setloading] = useState(false);
  const DeleteApi = async () => {
    try {
      setloading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: id,
      });

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3000/api", requestOptions);
    } catch (error) {
      console.log("error while deleting", error);
    } finally {
      setloading(false);
    }
  };
  return (
    <button
      onClick={DeleteApi}
      className="bg-red-500 hover:bg-red-600 transition-all text-white px-3 py-1 rounded"
    >
      {loading ? "loading..." : "Delete"}
    </button>
  );
};

export default Button;
