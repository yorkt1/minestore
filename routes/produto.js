import express from "express";
import Produto from "../models/Produto.js";

const router = express.Router();

// GET /produto - listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// GET /produto/:id - buscar um produto
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

// POST /produto - criar novo
router.post("/", async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const salvo = await novoProduto.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar produto" });
  }
});

// PUT /produto/:id - editar
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar produto" });
  }
});

// DELETE /produto/:id - excluir
router.delete("/:id", async (req, res) => {
  try {
    const removido = await Produto.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json({ mensagem: "Produto excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
});

export default router;
