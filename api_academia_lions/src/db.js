import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Função responsável por conectar a aplicação ao MongoDB Atlas
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("A variável MONGO_URI não foi definida no arquivo .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado ao MongoDB com sucesso! (Academia Lions)");
  } catch (error) {
    console.log("Erro ao conectar ao MongoDB:", error.message);

    // Encerra a aplicação caso a conexão com o banco falhe
    process.exit(1);
  }
};

export default connectDB;