import { Router } from "express";
import AgendamentoController from "../controllers/agendamento.controller.js";

const router = Router();

router.post("/api/agendamento/cadastro", AgendamentoController.cadastrar);
router.get("/api/agendamento", AgendamentoController.listar);
router.patch("/api/agendamento/:id", AgendamentoController.atualizar);
router.delete("/api/agendamento/:id", AgendamentoController.deletar);

export default router;