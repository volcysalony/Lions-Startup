import mongoose from "mongoose";
import express from "express";
import Agendamento from "../models/agendamento.js";

const router = express.Router();

function calcularValor(especie, servico) {
  const tabela = {
    "Cão": {
      "Banho": 50,
      "Tosa": 60,
      "Banho e Tosa": 100,
    },
    "Gato": {
      "Banho": 60,
      "Tosa": 70,
      "Banho e Tosa": 110,
    },
    "Outro": {
      "Banho": 40,
      "Tosa": 50,
      "Banho e Tosa": 80,
    },
  };

  return tabela[especie]?.[servico];
}

// CREATE
router.post("/agendamentos", async (req, res) => {
  try {
    const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

    const valor = calcularValor(especie, servico);

    if (!valor) {
      return res.status(400).json({
        mensagem: "Espécie ou serviço inválido.",
      });
    }

    const agendamento = await Agendamento.create({
      nomePet,
      especie,
      nomeDono,
      telefoneDono,
      servico,
      data,
      valor,
    });

    return res.status(201).json(agendamento);
  } catch (error) {
    return res.status(400).json({
      mensagem: "Erro ao cadastrar agendamento.",
      erro: error.message,
    });
  }
});

// READ
router.get("/agendamentos", async (req, res) => {
  try {
    console.log("Estado Mongo na rota:", mongoose.connection.readyState);

    const agendamentos = await Agendamento.find();

    return res.status(200).json(agendamentos);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar agendamentos.",
      erro: error.message,
    });
  }
});

// BUSCA POR NOME DO PET
router.get("/agendamentos/busca", async (req, res) => {
  try {
    const { nome } = req.query;

    const filtro = nome
      ? { nomePet: { $regex: nome, $options: "i" } }
      : {};

    const agendamentos = await Agendamento.find(filtro);

    return res.status(200).json(agendamentos);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar agendamentos.",
      erro: error.message,
    });
  }
});

// UPDATE STATUS
router.patch("/agendamentos/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const agendamento = await Agendamento.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!agendamento) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado.",
      });
    }

    return res.status(200).json(agendamento);
  } catch (error) {
    return res.status(400).json({
      mensagem: "Erro ao atualizar status.",
      erro: error.message,
    });
  }
});

// DELETE
router.delete("/agendamentos/:id", async (req, res) => {
  try {
    const agendamento = await Agendamento.findByIdAndDelete(req.params.id);

    if (!agendamento) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado.",
      });
    }

    return res.status(200).json({
      mensagem: "Agendamento removido com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao remover agendamento.",
      erro: error.message,
    });
  }
});

export default router;