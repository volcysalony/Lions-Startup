import AgendamentoService from "../services/agendamento.service.js";

async function cadastrar(req, res) {
  try {
    const { nomePet, especie, nomeDono, telefoneDono, servico, data } = req.body;

    const novoAgendamento = await AgendamentoService.cadastrar({
      nomePet,
      especie,
      nomeDono,
      telefoneDono,
      servico,
      data
    });

    res.status(201).json({
      mensagem: "Agendamento criado com sucesso!",
      agendamento: novoAgendamento
    });
  } catch (erro) {
    res.status(400).json({
      mensagem: `Erro ao criar o agendamento: ${erro.message}`
    });
  }
}

async function listar(req, res) {
  try {
    const agendamentos = await AgendamentoService.listar();

    res.status(200).json({
      mensagem: "Agendamentos listados com sucesso!",
      agendamentos
    });
  } catch (erro) {
    res.status(400).json({
      mensagem: `Erro ao listar agendamentos: ${erro.message}`
    });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;

    const agendamentoAtualizado = await AgendamentoService.atualizar(id, req.body);

    if (!agendamentoAtualizado) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado!"
      });
    }

    res.status(200).json({
      mensagem: "Agendamento atualizado com sucesso!",
      agendamento: agendamentoAtualizado
    });
  } catch (erro) {
    res.status(400).json({
      mensagem: `Erro ao atualizar agendamento: ${erro.message}`
    });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;

    const agendamentoDeletado = await AgendamentoService.deletar(id);

    if (!agendamentoDeletado) {
      return res.status(404).json({
        mensagem: "Agendamento não encontrado!"
      });
    }

    res.status(200).json({
      mensagem: "Agendamento deletado com sucesso!",
      agendamento: agendamentoDeletado
    });
  } catch (erro) {
    res.status(400).json({
      mensagem: `Erro ao deletar agendamento: ${erro.message}`
    });
  }
}

const AgendamentoController = {
  cadastrar,
  listar,
  atualizar,
  deletar
};

export default AgendamentoController;