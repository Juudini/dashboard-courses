"use client";

import CursoInputs from "./Curso";
import { useEffect, useState } from "react";
export interface OptionList {
  id: string;
  title: string;
}

const FormElements = () => {
  const [optionList, setOptionList] = useState<any[]>([]);

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
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* <!-- Curso Fields --> */}
        <CursoInputs optionList={optionList} />
      </div>
    </>
  );
};

export default FormElements;
