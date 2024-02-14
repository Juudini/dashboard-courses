import { NextResponse } from "next/server";
import { PaginationDto, executePagination } from "@/shared";
import prisma from "@/libs/prisma";

interface Segments {
  params: {
    id: string;
  };
}
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

export async function GET(request: Request, { params }: Segments) {
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
      where: {
        categories: {
          has: params.id,
        },
      },
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
