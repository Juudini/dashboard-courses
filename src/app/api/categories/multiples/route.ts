import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const data: any = await req.json();

    const deletedCategory = await prisma.category.deleteMany({
      where: {
        id: { in: data },
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
