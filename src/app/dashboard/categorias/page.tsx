import Breadcrumb from "@/components/dashboard/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";

import CategoriaInputs from "@/components/dashboard/FormElements/Categoria";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Categorias | Dashboard",
  description: "This is Categorias page for dashboard",
};

const Categorias = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Categorias" />
        <CategoriaInputs />
      </div>
    </DefaultLayout>
  );
};

export default Categorias;
