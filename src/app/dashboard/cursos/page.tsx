import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import InputElements from "@/components/Cursos/InputElements";

export const metadata: Metadata = {
  title: "Cursos | Admin",
  description: "Administración de cursos.",
};

const Cursos: React.FC = () => {
  return (
    <DefaultLayout>
      <InputElements />
    </DefaultLayout>
  );
};

export default Cursos;
