import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
  {
    nomePet: {
      type: String,
      required: true,
      trim: true,
    },
    especie: {
      type: String,
      required: true,
      enum: ["Cão", "Gato", "Outro"],
    },
    nomeDono: {
      type: String,
      required: true,
      trim: true,
    },
    telefoneDono: {
      type: String,
      required: true,
      trim: true,
    },
    servico: {
      type: String,
      required: true,
      enum: ["Banho", "Tosa", "Banho e Tosa"],
    },
    data: {
      type: String,
      required: true,
    },
    valor: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Agendado", "Concluído", "Cancelado"],
      default: "Agendado",
    },
  },
  {
    timestamps: true,
  }
);

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;