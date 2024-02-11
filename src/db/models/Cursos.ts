import { Schema, model } from "mongoose";

// Define the curso schema
const CursoSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  // categoriaId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "categorias",
  // },
});

// Create the curso model using "model" directly
export const cursoModel = model("cursos", CursoSchema);
