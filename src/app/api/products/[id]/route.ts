import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

interface Segments {
  params: {
    id: string;
  };
}

const productSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(255, { message: "Title must be at most 255 characters long" })
    .optional(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(255, { message: "Description must be at most 255 characters long" })
    .optional(),
  price: z
    .number()
    .min(3, { message: "Price must be at least 3 characters long" })
    .optional(),
  categories: z.array(z.string()).optional(),
  image: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(req: Request, { params }: Segments) {
  try {
    const payloadCurso = await prisma.product.findMany({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Curso found successfully",
      payload: payloadCurso,
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
    const newProductData = productSchema.parse(await req.json());

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { status: false, message: "Curso not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: newProductData,
    });

    return NextResponse.json({
      status: true,
      message: "Curso updated successfully",
      payload: updatedProduct,
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
    const deletedProduct = await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    if (!deletedProduct) {
      return NextResponse.json({
        status: false,
        message: "Curso not found or already deleted",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Curso deleted successfully",
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
