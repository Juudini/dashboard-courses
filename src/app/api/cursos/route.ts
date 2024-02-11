import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";
import { envs } from "@/helpers/env.config";
import { MongoDatabase } from "@/db/db.config";
import { cursoModel } from "@/db/models/Cursos";

const databaseConnection = new MongoDatabase();

const postCursoSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  precio: yup.number().required(),
  categoriaId: yup.string().required(),
});

export async function POST(request: Request) {
  try {
    await databaseConnection.connect({
      dbName: envs.DB_NAME,
      mongoUrl: envs.MONGODB_URI,
    });

    const payload = await request.json();
    console.log(request);

    if (!payload) {
      return NextResponse.json({ message: "error validate" }, { status: 400 });
    }

    await cursoModel.create(payload);
    return NextResponse.json(payload);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    await databaseConnection.close();
  }
}

export async function GET(request: Request) {
  try {
    return NextResponse.json("Hola");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

// const postSchema = yup.object({
//   description: yup.string().required(),
//   complete: yup.boolean().optional().default(false),
// });

// export async function POST(request: Request) {
//   try {
//     const { complete, description } = await postSchema.validate(
//       await request.json(),
//     );

//     const todo = await prisma.todo.create({ data: { complete, description } });

//     return NextResponse.json(todo);
//   } catch (error) {
//     return NextResponse.json(error, { status: 400 });
//   }
// }
// export async function DELETE(request: Request) {
//   try {
//     await prisma.todo.deleteMany({ where: { complete: true } });
//     return NextResponse.json("Borrados");
//   } catch (error) {
//     return NextResponse.json(error, { status: 400 });
//   }
// }
