import Agendamento from "../models/agendamento.js";

async function criar(dadosAgendamento) {
  return Agendamento.create(dadosAgendamento);
}

async function listar() {
  return Agendamento.find();
}

async function atualizar(id, dadosAtualizados) {
  return Agendamento.findByIdAndUpdate(id, dadosAtualizados, {
    new: true,
    runValidators: true
  });
}

async function deletar(id) {
  return Agendamento.findByIdAndDelete(id);
}

const AgendamentoRepository = {
  criar,
  listar,
  atualizar,
  deletar
};

export default AgendamentoRepository;