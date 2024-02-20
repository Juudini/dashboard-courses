"use client";
import React, { useEffect, useState } from "react";
import { Eliminar } from "./categoria/Eliminar";
import Crear from "./categoria/Crear";

export default function CategoriaInputs() {
  const [optionList, setOptionList] = useState<any>([]);

  const handleGetCategories = async () => {
    try {
      const res: any = await fetch("/api/categories?limit=10000", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data.payload;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await handleGetCategories();

        setOptionList(categoriesData);
        console.log(categoriesData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-9">
      <Crear />
      <Eliminar
        optionList={optionList}
        id={"EliminarCategoria"}
        title={"Seleccionar Categorías"}
        placeholder={"Categorías a Eliminar"}
      />
    </div>
  );
}
