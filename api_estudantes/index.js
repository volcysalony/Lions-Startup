import express from "express";

import estudanteRoutes from "./rotas/estudanteRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "API de estudantes funcionando!"
    });
});

app.use(estudanteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});