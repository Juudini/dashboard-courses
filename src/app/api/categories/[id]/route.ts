import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { categorySchema } from "../route";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Segments) {
  try {
    const payloadCategories = await prisma.category.findMany({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Categories found successfully",
      payload: payloadCategories,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Segments) {
  try {
    const newCategoryData = categorySchema.parse(await req.json());

    const existingProduct = await prisma.category.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { status: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: params.id,
      },
      data: newCategoryData,
    });

    return NextResponse.json({
      status: true,
      message: "Category updated successfully",
      payload: updatedCategory,
    });
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

export async function DELETE(req: Request, { params }: Segments) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: params.id,
      },
    });

    if (!deletedCategory) {
      return NextResponse.json({
        status: false,
        message: "Category not found or already deleted",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
