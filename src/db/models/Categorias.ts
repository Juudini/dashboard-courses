import { Schema, model } from "mongoose";

// Define the categoria schema
const CategoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
});

// Create the categoria model using "model" directly
export const categoriaModel = model("categorias", CategoriaSchema);
