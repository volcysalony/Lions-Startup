import mongoose from "mongoose";

// Schema responsável por definir a estrutura dos imóveis no MongoDB
const ImovelSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "O título do imóvel é obrigatório."],
    trim: true,
  },

  descricao: {
    type: String,
    required: [true, "A descrição do imóvel é obrigatória."],
    trim: true,
  },

  localizacao: {
    type: String,
    required: [true, "A localização do imóvel é obrigatória."],
    trim: true,
  },

  precoNoite: {
    type: Number,
    required: [true, "O preço por noite é obrigatório."],
  },

  capacidadeMaxima: {
    type: Number,
    required: [true, "A capacidade máxima de hóspedes é obrigatória."],
  },

  disponivel: {
    type: Boolean,
    default: true,
  },
});

// Cria o model Imovel, que será usado para fazer CRUD na coleção de imóveis
const Imovel = mongoose.model("Imovel", ImovelSchema);

export default Imovel;