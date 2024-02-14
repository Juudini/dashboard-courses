import { StaticImageData } from "next/image";

export interface iCurso {
    id: number;
    name: string;
    categories: string[];
    price: number;
    img: StaticImageData;
}