import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Función principal para manejar la petición PUT
export async function PUT(req: Request) {
  try {
    const newUserData = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        id: newUserData.id,
      },
      select: { password: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { status: false, message: "User not found" },
        { status: 404 }
      );
    }

    let isPasswordValid = true;

    if (newUserData.newPassword !== null) {
      isPasswordValid = bcryptjs.compareSync(
        newUserData.currentPassword,
        existingUser.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { status: false, message: "Current password is incorrect" },
          { status: 400 }
        );
      }
    }

    const updatedUserData: {
      email: string;
      name: string;
      password?: string;
    } = {
      email: newUserData.newEmail,
      name: newUserData.newName,
    };

    if (newUserData.newPassword !== null) {
      const hashedNewPassword = bcryptjs.hashSync(newUserData.newPassword);
      updatedUserData.password = hashedNewPassword;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: newUserData.id,
      },
      data: updatedUserData,
    });

    return NextResponse.json({
      status: true,
      message: "User updated successfully",
      payload: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
