import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Matricula from "./models/matricula.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir que a API leia JSON no corpo das requisições
app.use(express.json());

// Conecta ao MongoDB antes de iniciar o servidor
await connectDB();

// Rota inicial apenas para testar se a API está rodando
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API da Academia Lions rodando com sucesso!",
  });
});

// Função auxiliar para definir o valor mensal pela modalidade
function calcularValorMensal(modalidade) {
  if (modalidade === "Musculação") {
    return 90;
  }

  if (modalidade === "Funcional") {
    return 120;
  }

  if (modalidade === "Dança") {
    return 100;
  }

  return null;
}

// Função auxiliar para calcular o valor total conforme o plano contratado
function calcularValorTotal(valorMensal, plano) {
  if (plano === "Mensal") {
    return valorMensal;
  }

  if (plano === "Trimestral") {
    return valorMensal * 3 * 0.9;
  }

  if (plano === "Semestral") {
    return valorMensal * 6 * 0.85;
  }

  return null;
}

// =====================================================
// ROTAS DE MATRÍCULAS
// =====================================================

// CREATE - Cadastrar uma nova matrícula
app.post("/matriculas", async (req, res) => {
  try {
    const { nomeAluno, idade, modalidade, plano, dataMatricula } = req.body;

    // Calcula o valor mensal de acordo com a modalidade escolhida
    const valorMensal = calcularValorMensal(modalidade);

    if (!valorMensal) {
      return res.status(400).json({
        message: "Modalidade inválida.",
      });
    }

    // Calcula o valor total de acordo com o plano escolhido
    const valorTotal = calcularValorTotal(valorMensal, plano);

    if (!valorTotal) {
      return res.status(400).json({
        message: "Plano inválido.",
      });
    }

    const novaMatricula = await Matricula.create({
      nomeAluno,
      idade,
      modalidade,
      plano,
      dataMatricula,
      valorMensal,
      valorTotal,
    });

    res.status(201).json(novaMatricula);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao cadastrar matrícula.",
      error: error.message,
    });
  }
});

// READ - Listar todas as matrículas cadastradas
app.get("/matriculas", async (req, res) => {
  try {
    const matriculas = await Matricula.find();

    res.status(200).json(matriculas);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar matrículas.",
      error: error.message,
    });
  }
});

// QUERY PARAMS - Buscar matrículas por modalidade
app.get("/matriculas/busca", async (req, res) => {
  try {
    const { modalidade } = req.query;

    const filtro = {};

    if (modalidade) {
      filtro.modalidade = {
        $regex: modalidade,
        $options: "i",
      };
    }

    const matriculas = await Matricula.find(filtro);

    res.status(200).json(matriculas);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar matrículas.",
      error: error.message,
    });
  }
});

// UPDATE - Atualizar apenas o status da matrícula
app.patch("/matriculas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const matriculaAtualizada = await Matricula.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!matriculaAtualizada) {
      return res.status(404).json({
        message: "Matrícula não encontrada.",
      });
    }

    res.status(200).json(matriculaAtualizada);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao atualizar status da matrícula.",
      error: error.message,
    });
  }
});

// DELETE - Remover matrícula pelo ID
app.delete("/matriculas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const matriculaRemovida = await Matricula.findByIdAndDelete(id);

    if (!matriculaRemovida) {
      return res.status(404).json({
        message: "Matrícula não encontrada.",
      });
    }

    res.status(200).json({
      message: "Matrícula removida com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao remover matrícula.",
      error: error.message,
    });
  }
});

// Inicializa o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});