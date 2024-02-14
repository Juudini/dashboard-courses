import { NextResponse, NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { PaginationDto, executePagination } from "@/shared";
import prisma from "@/libs/prisma";

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
  image: z.array(z.string()).optional(),
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

export async function POST(req: Request) {
  try {
    const validatedData = productSchema.parse(await req.json());

    const payloadDb = await prisma.product.create({ data: validatedData });

    return NextResponse.json({ payload: payloadDb });
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
