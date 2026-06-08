import express from "express";
import dotenv from "dotenv";
import conectarBanco from "./db.js";
import agendamentoRoutes from "./routes/agendamento.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

conectarBanco();

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API PetLions funcionando!",
  });
});

app.use(agendamentoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});