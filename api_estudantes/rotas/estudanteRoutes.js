import express from "express";

import {
    criarEstudante,
    listarEstudantes,
    atualizarEstudante,
    deletarEstudante,
    buscarEstudantes
} from "../controllers/estudanteController.js";

const router = express.Router();

// CREATE
router.post("/estudantes/criar", criarEstudante);

// READ
router.get("/estudantes", listarEstudantes);

// UPDATE
router.put("/estudantes/:id", atualizarEstudante);

// DELETE
router.delete("/estudantes/:id", deletarEstudante);

// QUERY PARAMS
router.get("/estudantes/busca", buscarEstudantes);

export default router;