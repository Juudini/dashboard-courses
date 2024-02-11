"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";

import Link from "next/link";
import { useState } from "react";

const InputElements = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };
  return (
    <>
      <Breadcrumb pageName="Cursos" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Administrar Producto --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Administrar Producto
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {/* <!-- Tabs Producto --> */}
              <div>
                <div className="mb-4 flex">
                  <button
                    className={`flex-1 px-4 py-2 text-center focus:outline-none ${
                      activeTab === "tab1"
                        ? "bg-primary text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition duration-300 ease-in-out`}
                    onClick={() => handleTabClick("tab1")}
                  >
                    Añadir
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 text-center focus:outline-none ${
                      activeTab === "tab2"
                        ? "bg-primary text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition duration-300 ease-in-out`}
                    onClick={() => handleTabClick("tab2")}
                  >
                    Eliminar
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 text-center focus:outline-none ${
                      activeTab === "tab3"
                        ? "bg-primary text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition duration-300 ease-in-out`}
                    onClick={() => handleTabClick("tab3")}
                  >
                    Actualizar
                  </button>
                  {/* Agrega más botones según sea necesario */}
                </div>
                {/* Contenido del tab activo */}
                <div className="rounded bg-white p-4">
                  {/* Contenido del Tab 1 */}
                  <div
                    className={`tab-content ${activeTab === "tab1" ? "" : "hidden"} space-y-2`}
                    id="tab1"
                  >
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre del curso"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Descripción
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Descripción del curso"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea>
                    </div>
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Precio
                      </label>
                      <input
                        type="number"
                        placeholder="Precio del curso"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Subir imagen
                      </label>
                      <input
                        type="file"
                        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                      />
                    </div>
                    <DatePickerOne />
                    <MultiSelect id="multiSelect" labelTitle="Categorías" />
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Añadir curso
                    </Link>
                  </div>

                  {/* Contenido del Tab 2 */}
                  <div
                    className={`tab-content ${activeTab === "tab2" ? "" : "hidden"}`}
                    id="tab2"
                  >
                    <h1 className="mb-2 text-lg font-semibold">
                      Contenido del Tab 2
                    </h1>
                    <p>Este es el contenido del segundo tab.</p>
                  </div>
                  {/* Contenido del Tab 3 */}
                  <div
                    className={`tab-content ${activeTab === "tab3" ? "" : "hidden"}`}
                    id="tab3"
                  >
                    <h1 className="mb-2 text-lg font-semibold">
                      Contenido del Tab 3
                    </h1>
                    <p>Este es el contenido del segundo tab.</p>
                  </div>
                  {/* Agrega más bloques de contenido para otros tabs según sea necesario */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Fin Administrar Producto --> */}
        {/* <!-- Administrar Categorías --> */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Administrar Categorías
              </h3>
            </div>
            {/* <!-- Añadir Categorías --> */}
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Añadir
                </label>
                <input
                  type="text"
                  placeholder="Nombre de la categoría"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Añadir categoría
              </Link>
            </div>
            {/* <!-- Fin Añadir Categorías --> */}
            {/* <!-- Eliminar Categorías --> */}
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <MultiSelect id="multiSelect" labelTitle="Eliminar" />
              </div>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-md bg-danger px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Eliminar categoría
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputElements;
