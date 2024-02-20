"use client";
import React, { useState } from "react";

export default function Crear() {
  const [categoryTitle, setCategoryTitle] = useState("");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: categoryTitle,
        }),
      });
      setCategoryTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Añadir Categoría
        </h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Título
          </label>
          <input
            type="text"
            placeholder="Título de la categoría"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Añadir Nueva Categoría
        </button>
      </div>
    </form>
  );
}
