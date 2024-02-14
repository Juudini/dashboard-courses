import { NextResponse, NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { PaginationDto, executePagination } from "@/shared";
import prisma from "@/libs/prisma";

interface Category {
  id: string;
  title: string;
  isActive: boolean;
}
interface PaginationResultsProps {
  status: string;
  payload: Category[];
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

export const categorySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(25, { message: "Title must be at most 25 characters long" }),
  isActive: z.boolean().optional(),
});

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

    const docs: number = await prisma.category.count();

    const skipValue = (paginationDto.page - 1) * paginationDto.limit;

    const products = await prisma.category.findMany({
      take: limit,
      skip: skipValue,
      orderBy: { title: paginationDto.sort },
    });

    const paginationResults: PaginationResultsProps = executePagination({
      page: parseInt(paginationDto.page),
      limit: parseInt(paginationDto.limit),
      sort: paginationDto.sort,
      productUrl: "categories",
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

export async function POST(request: Request) {
  try {
    const validated = categorySchema.parse(await request.json());

    const payloadFromDb = await prisma.category.create({ data: validated });

    return NextResponse.json({ payload: payloadFromDb });
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
