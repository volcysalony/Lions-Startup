import mongoose from "mongoose";

// Subschema usado para representar cada hóspede dentro da reserva
const HospedeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome do hóspede é obrigatório."],
    trim: true,
  },

  idade: {
    type: Number,
    required: [true, "A idade do hóspede é obrigatória."],
  },
});

// Schema principal da reserva
const ReservaSchema = new mongoose.Schema({
  // Guarda o _id do imóvel reservado como texto
  imovelId: {
    type: String,
    required: [true, "O ID do imóvel é obrigatório."],
  },

  nomeHospede: {
    type: String,
    required: [true, "O nome do responsável pela reserva é obrigatório."],
    trim: true,
  },

  emailHospede: {
    type: String,
    required: [true, "O e-mail do responsável é obrigatório."],
    trim: true,
  },

  dataEntrada: {
    type: String,
    required: [true, "A data de check-in é obrigatória."],
  },

  quantidadeNoites: {
    type: Number,
    required: [true, "A quantidade de noites é obrigatória."],
  },

  // Lista de hóspedes da reserva
  hospedes: {
    type: [HospedeSchema],
    required: [true, "A lista de hóspedes é obrigatória."],
  },

  // Calculado automaticamente no server.js
  valorTotal: {
    type: Number,
  },

  status: {
    type: String,
    default: "Pendente",
    enum: {
      values: ["Pendente", "Confirmada", "Cancelada"],
      message: "Status inválido.",
    },
  },
});

const Reserva = mongoose.model("Reserva", ReservaSchema);

export default Reserva;