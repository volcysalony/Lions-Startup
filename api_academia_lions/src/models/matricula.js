import mongoose from "mongoose";

// Schema responsável por definir a estrutura das matrículas no MongoDB
const MatriculaSchema = new mongoose.Schema(
  {
    nomeAluno: {
      type: String,
      required: [true, "O nome do aluno é obrigatório."],
      trim: true,
    },

    idade: {
      type: Number,
      required: [true, "A idade é obrigatória."],
    },

    modalidade: {
      type: String,
      required: [true, "A modalidade é obrigatória."],
      enum: {
        values: ["Musculação", "Funcional", "Dança"],
        message: "Modalidade inválida.",
      },
    },

    plano: {
      type: String,
      required: [true, "O plano é obrigatório."],
      enum: {
        values: ["Mensal", "Trimestral", "Semestral"],
        message: "Plano inválido.",
      },
    },

    dataMatricula: {
      type: String,
      required: [true, "A data da matrícula é obrigatória."],
    },

    // Calculado automaticamente no server.js
    valorMensal: {
      type: Number,
    },

    // Calculado automaticamente no server.js
    valorTotal: {
      type: Number,
    },

    status: {
      type: String,
      default: "Ativa",
      enum: {
        values: ["Ativa", "Pausada", "Cancelada"],
        message: "Status inválido.",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Model usado para executar operações CRUD na coleção de matrículas
const Matricula = mongoose.model("Matricula", MatriculaSchema);

export default Matricula;