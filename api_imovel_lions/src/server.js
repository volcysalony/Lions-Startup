import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

import Imovel from "./models/imovel.js";
import Reserva from "./models/reserva.js";
import Avaliacao from "./models/avaliacao.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir que a API receba JSON no corpo das requisições
app.use(express.json());

// Conecta ao MongoDB antes de iniciar o servidor
await connectDB();

// Rota inicial apenas para testar se a API está rodando
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API da startup Imóvel Lions rodando com sucesso!",
  });
});

// =====================================================
// ROTAS DE IMÓVEIS
// =====================================================

// CREATE - Cadastrar um novo imóvel
app.post("/imoveis", async (req, res) => {
  try {
    const { titulo, descricao, localizacao, precoNoite, capacidadeMaxima } = req.body;

    const novoImovel = await Imovel.create({
      titulo,
      descricao,
      localizacao,
      precoNoite,
      capacidadeMaxima,
    });

    res.status(201).json(novoImovel);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao cadastrar imóvel.",
      error: error.message,
    });
  }
});

// READ - Listar todos os imóveis cadastrados
app.get("/imoveis", async (req, res) => {
  try {
    const imoveis = await Imovel.find();

    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar imóveis.",
      error: error.message,
    });
  }
});

// QUERY PARAMS - Buscar imóveis pela localização
app.get("/imoveis/busca", async (req, res) => {
  try {
    const { localizacao } = req.query;

    const filtro = {};

    if (localizacao) {
      filtro.localizacao = {
        $regex: localizacao,
        $options: "i",
      };
    }

    const imoveis = await Imovel.find(filtro);

    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar imóveis por localização.",
      error: error.message,
    });
  }
});

// =====================================================
// ROTAS DE RESERVAS
// =====================================================

// CREATE - Criar uma nova reserva
app.post("/reservas", async (req, res) => {
  try {
    const {
      imovelId,
      nomeHospede,
      emailHospede,
      dataEntrada,
      quantidadeNoites,
      hospedes,
    } = req.body;

    // Verifica se o imóvel informado existe no banco
    const imovel = await Imovel.findById(imovelId);

    if (!imovel) {
      return res.status(404).json({
        message: "Imóvel não encontrado.",
      });
    }

    // Verifica se a lista de hóspedes foi enviada corretamente
    if (!Array.isArray(hospedes)) {
      return res.status(400).json({
        message: "O campo hospedes deve ser um array.",
      });
    }

    // Verifica se a quantidade de hóspedes não ultrapassa a capacidade máxima
    if (hospedes.length > imovel.capacidadeMaxima) {
      return res.status(400).json({
        message: `A quantidade de hóspedes (${hospedes.length}) excede a capacidade máxima permitida (${imovel.capacidadeMaxima}).`,
      });
    }

    // Verifica se a quantidade de noites é válida
    if (quantidadeNoites <= 0) {
      return res.status(400).json({
        message: "A quantidade de noites deve ser maior que zero.",
      });
    }

    // Calcula o valor total da reserva
    const valorTotal = quantidadeNoites * imovel.precoNoite;

    const novaReserva = await Reserva.create({
      imovelId,
      nomeHospede,
      emailHospede,
      dataEntrada,
      quantidadeNoites,
      hospedes,
      valorTotal,
    });

    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao criar reserva.",
      error: error.message,
    });
  }
});

// READ - Listar todas as reservas cadastradas
app.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find();

    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar reservas.",
      error: error.message,
    });
  }
});

// UPDATE - Alterar apenas o status da reserva
app.patch("/reservas/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservaAtualizada = await Reserva.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!reservaAtualizada) {
      return res.status(404).json({
        message: "Reserva não encontrada.",
      });
    }

    res.status(200).json(reservaAtualizada);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao atualizar status da reserva.",
      error: error.message,
    });
  }
});

// =====================================================
// ROTAS DE AVALIAÇÕES
// =====================================================

// CREATE - Criar uma avaliação para um imóvel
app.post("/avaliacoes", async (req, res) => {
  try {
    const { imovelId, nomeUsuario, nota, comentario } = req.body;

    // Verifica se o imóvel avaliado existe
    const imovel = await Imovel.findById(imovelId);

    if (!imovel) {
      return res.status(404).json({
        message: "Imóvel não encontrado.",
      });
    }

    const novaAvaliacao = await Avaliacao.create({
      imovelId,
      nomeUsuario,
      nota,
      comentario,
    });

    res.status(201).json(novaAvaliacao);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao criar avaliação.",
      error: error.message,
    });
  }
});

// READ - Listar avaliações de um imóvel e calcular média das notas
app.get("/avaliacoes/imovel/:imovelId", async (req, res) => {
  try {
    const { imovelId } = req.params;

    const avaliacoes = await Avaliacao.find({ imovelId });

    let somaNotas = 0;

    for (const avaliacao of avaliacoes) {
      somaNotas += avaliacao.nota;
    }

    const mediaGeral =
      avaliacoes.length > 0 ? somaNotas / avaliacoes.length : 0;

    res.status(200).json({
      avaliacoes,
      mediaGeral: Number(mediaGeral.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao carregar avaliações.",
      error: error.message,
    });
  }
});

// DELETE - Excluir avaliação somente se o nome do usuário for o dono dela
app.delete("/avaliacoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeUsuario } = req.body;

    const avaliacao = await Avaliacao.findById(id);

    if (!avaliacao) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }

    // Segurança simples: só permite excluir se o nome enviado for o dono da avaliação
    if (avaliacao.nomeUsuario !== nomeUsuario) {
      return res.status(403).json({
        message: "Você não tem permissão para deletar a avaliação de outro usuário.",
      });
    }

    await Avaliacao.findByIdAndDelete(id);

    res.status(200).json({
      message: "Avaliação removida com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir avaliação.",
      error: error.message,
    });
  }
});

// Inicializa o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});