import { NextResponse, NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { PaginationDto, executePagination } from "@/shared";
import prisma from "@/libs/prisma";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const productSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(255, { message: "Title must be at most 255 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(255, { message: "Description must be at most 255 characters long" }),
  price: z
    .number()
    .min(1, { message: "Price must be at least 3 characters long" }),
  categories: z.array(z.string()),
  isActive: z.boolean().optional(),
});

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  image: string[];
  categories: string[];
}
interface PaginationResultsProps {
  status: string;
  payload: Product[];
  page: number;
  docs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  prevLink: string | null;
  nextLink: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "10");
  const page = Number(searchParams.get("page") ?? "1");
  const sort = searchParams.get("sort") ?? "asc";
  try {
    const [err, paginationDto]: any = PaginationDto.create({
      limit: limit,
      page: page,
      sort: sort,
    });
    if (err) {
      return NextResponse.json(err);
    }

    const docs: number = await prisma.product.count();

    const skipValue = (paginationDto.page - 1) * paginationDto.limit;

    const products = await prisma.product.findMany({
      take: limit,
      skip: skipValue,
      orderBy: { price: paginationDto.sort },
      include: {
        productImage: true,
      },
    });

    const paginationResults: PaginationResultsProps = executePagination({
      page: parseInt(paginationDto.page),
      limit: parseInt(paginationDto.limit),
      sort: paginationDto.sort,
      productUrl: "products",
      docs: docs,
      products: products,
    });

    return NextResponse.json(paginationResults);
  } catch (err) {
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}

// !! NO SE ESTÁ USANDO EL ZOD VALIDATOR
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Parse other form fields
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const categoriesJson = formData.get("categories") as string;
    const categories = JSON.parse(categoriesJson);
    // Assuming you have a 'images' field in your form
    const images: any = formData.getAll("images");

    // Create the product in the database
    const productDb = await prisma.product.create({
      data: {
        title,
        price: parseInt(price, 10),
        categories,
        description,
      },
    });

    // Upload and associate images with the product
    if (images.length > 0) {
      const uploadedImages = await uploadImages(images);

      // Create entries for images in the database
      await prisma.productImage.createMany({
        data: uploadedImages!.map((image: any) => ({
          url: image,
          productId: productDb.id,
        })),
      });
    }

    return NextResponse.json({ payload: productDb });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          status: false,
          message: err.issues[0].message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }
  }
}
const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        const cloudinaryResponse = await cloudinary.uploader.upload(
          `data:${image.type};base64,${base64Image}`
        );

        return cloudinaryResponse.secure_url;
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error("Error al subir imágenes a Cloudinary:", error);
    return null;
  }
};
