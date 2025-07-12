import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true, // garante que não repita o mesmo número
    },
    nome: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
      enum: ["Jogos", "Skins", "Texturas", "Merchandising"],
    },
    preco: {
      type: Number,
      required: true,
      min: 0,
    },
    estoque: {
      type: Number,
      default: 0,
      min: 0,
    },
    descricao: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    imagem: {
      type: String,
      default: "../images/placeholder-image.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Produto", ProdutoSchema);
