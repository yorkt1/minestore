import express from "express";
import Produto from "../models/Produto.js";
import { getNextSequence } from "../utils/counte.js";

const router = express.Router();

// POST /produto - criar novo com ID sequencial
router.post("/", async (req, res) => {
  try {
    const nextId = await getNextSequence("produtoid");

    const novoProduto = new Produto({
      ...req.body,
      id: nextId, // ID sequencial tipo 1, 2, 3...
    });

    const salvo = await novoProduto.save();
    res.status(201).json(salvo);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(400).json({ erro: "Erro ao criar produto" });
  }
});

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
    const produto = await Produto.findOne({ id: req.params.id });
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

// PUT /produto/:id - editar por ID sequencial
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Produto.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar produto" });
  }
});

// DELETE /produto/:id - excluir por ID sequencial
router.delete("/:id", async (req, res) => {
  try {
    const removido = await Produto.findOneAndDelete({ id: req.params.id });
    if (!removido) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json({ mensagem: "Produto excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
});

export default router;
