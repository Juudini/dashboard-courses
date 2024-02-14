import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: "Juudini",
      email: "testing@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
    },
  });

  return NextResponse.json({
    message:
      "1_Borrado productos, 2_Borrado de users, 3_User creado exitosamente",
  });
}
