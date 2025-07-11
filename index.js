import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import produtoRoutes from "./routes/produto.js";

dotenv.config();

const app = express();
app.use(express.json());

// Habilita CORS para acessar do front
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ou define um domínio específico
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/produto", produtoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Erro na conexão com MongoDB:", err));
