import React, { useEffect, useRef, useState } from "react";
interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

export default function CursoInputs() {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);
  const [optionList, setOptionList] = useState<any>([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState("");

  const selectedValues = () => {
    return selected.map((option) => options[option].value);
  };

  const handleCreateCurso = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedOptionValues = selectedValues();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categories", JSON.stringify(selectedOptionValues));

    // Append all images to the formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await fetch("/api/products/", {
        method: "POST",
        body: formData,
      });

      // Handle the response if needed

      setTitle("");
      setPrice("");
      setSelected([]);
      setImages([]);
      setDescription("");
      const newOptions = options.map((opt) => ({ ...opt, selected: false }));
      setOptions(newOptions);

      // Reset other form data state variables
    } catch (error) {
      console.error("Error creating curso:", error);
    }
  };
  const handleGetCategories = async () => {
    try {
      const res: any = await fetch("/api/categories?limit=10000", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data.payload;
    } catch (err) {
      console.error(err);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Accede a los archivos seleccionados desde el input
    const selectedImages = e.target.files;

    // Convierte el objeto FileList a un array de Files y actualiza el estado
    if (selectedImages) {
      const imagesArray: File[] = Array.from(selectedImages);
      setImages(imagesArray);
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
  useEffect(() => {
    const newOptions: Option[] = optionList.map((data: any) => ({
      value: data.id,
      text: data.title,
      selected: false,
    }));
    setOptions(newOptions);
  }, [optionList]);

  const open = () => {
    setShow(true);
  };

  const isOpen = () => {
    return show === true;
  };

  const select = (index: number, event: React.MouseEvent) => {
    const newOptions = [...options];

    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      newOptions[index].element = event.currentTarget as HTMLElement;
      setSelected([...selected, index]);
    } else {
      const selectedIndex = selected.indexOf(index);
      if (selectedIndex !== -1) {
        newOptions[index].selected = false;
        setSelected(selected.filter((i) => i !== index));
      }
    }

    setOptions(newOptions);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (
        !show ||
        dropdownRef.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [show]);

  return (
    <form onSubmit={handleCreateCurso} className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Añadir Curso
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Título
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Título del curso"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Precio
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Precio del curso"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          {/* Multi Select */}

          <div>
            <div className="relative z-50">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Categorías
              </label>
              <div>
                <select className="hidden" id={optionList.id}>
                  {optionList.map((data: any) => (
                    <option key={data.id} value={data.title}>
                      {data.title}
                    </option>
                  ))}
                </select>

                <div className="flex flex-col items-center">
                  <input
                    name="values"
                    type="hidden"
                    defaultValue={selectedValues()}
                  />
                  <div className="relative z-20 inline-block w-full">
                    <div className="relative flex flex-col items-center">
                      <div ref={trigger} onClick={open} className="w-full">
                        <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                          <div className="flex flex-auto flex-wrap gap-3">
                            {selected.map((index) => (
                              <div
                                key={index}
                                className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                              >
                                <div className="max-w-full flex-initial">
                                  {options[index].text}
                                </div>
                                <div className="flex flex-auto flex-row-reverse">
                                  <div className="cursor-pointer pl-2 hover:text-danger">
                                    <svg
                                      className="fill-current"
                                      role="button"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {selected.length === 0 && (
                              <div className="flex-1">
                                <input
                                  placeholder="No existen categorías"
                                  className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                                  defaultValue={selectedValues()}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex w-8 items-center py-1 pl-1 pr-1">
                            <button
                              type="button"
                              onClick={open}
                              className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                    fill="#637381"
                                  ></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <div
                          className={`max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${
                            isOpen() ? "" : "hidden"
                          }`}
                          ref={dropdownRef}
                          onFocus={() => setShow(true)}
                          onBlur={() => setShow(false)}
                        >
                          <div className="flex w-full flex-col">
                            {options.map((option, index) => (
                              <div key={index}>
                                <div
                                  className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                                  onClick={(event) => select(index, event)}
                                >
                                  <div
                                    className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
                                      option.selected
                                        ? "border-primary bg-red/15"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex w-full items-center">
                                      <div className="mx-2 leading-6">
                                        {option.text}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multiselect */}
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Añadir Imágenes
            </label>
            <input
              multiple
              type="file"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Descripción del curso"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Añadir Nuevo Curso
          </button>
        </div>
      </div>
    </form>
  );
}
