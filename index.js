import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import produtoRoutes from "./routes/produto.js";

dotenv.config();
const app = express();

// Middleware para ler JSON
app.use(express.json());

// Middleware CORS para permitir requisições do front-end
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ou substitua por seu domínio
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Rotas
app.use("/produto", produtoRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Erro na conexão com MongoDB:", err));
