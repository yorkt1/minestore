import express from "express";
import Produto from "../models/Produto.js";

const router = express.Router();

// ➕ Criar novo produto (POST)
router.post("/", async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ erro: "Erro ao criar produto." });
  }
});

// 📄 Listar todos os produtos (GET)
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ erro: "Erro ao buscar produtos." });
  }
});

// ✏️ Atualizar produto (PUT)
router.put("/:id", async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json(produtoAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ erro: "Erro ao atualizar produto." });
  }
});

// ❌ Deletar produto (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);

    if (!produtoRemovido) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json({ mensagem: "Produto deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({ erro: "Erro ao deletar produto." });
  }
});

export default router;
