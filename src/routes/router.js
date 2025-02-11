import express from "express";
import administradorController from "../controllers/administradorController.js";
import eventoController from "../controllers/eventoController.js";
import formularioController from "../controllers/formularioController.js";
import tipoController from "../controllers/tipoController.js";
import feedbackController from "../controllers/feedbackController.js";
import certificadoController from "../controllers/certificadoController.js";
import participanteController from "../controllers/participanteController.js";


const router = express.Router();

// Rotas para Administrador
router.get("/administradores", administradorController.getAllAdministradores);
router.get("/administradores/:id", administradorController.getAdministradorById);
router.post("/administradores", administradorController.createAdministrador);
router.put("/administradores/:id", administradorController.updateAdministrador);
router.delete("/administradores/:id", administradorController.deleteAdministrador);

// Rotas para Evento
router.get("/eventos", eventoController.getAllEventos);
router.get("/eventos/:id", eventoController.getEventoById);
router.post("/eventos", eventoController.createEvento);
router.put("/eventos/:id", eventoController.updateEvento);
router.delete("/eventos/:id", eventoController.deleteEvento);

// Rotas para Formulario
router.get("/formularios", formularioController.getAllFormularios);
router.get("/formularios/:id", formularioController.getFormularioById);
router.post("/formularios", formularioController.createFormulario);
router.put("/formularios/:id", formularioController.updateFormulario);
router.delete("/formularios/:id", formularioController.deleteFormulario);

// Rotas para Tipo
router.get("/tipos", tipoController.getAllTipos);
router.get("/tipos/:id", tipoController.getTipoById);
router.post("/tipos", tipoController.createTipo);
router.put("/tipos/:id", tipoController.updateTipo);
router.delete("/tipos/:id", tipoController.deleteTipo);

// Rotas para Participante
router.get("/participantes", participanteController.getAllParticipantes);
router.get("/participantes/:id", participanteController.getParticipanteById);
router.post("/participantes", participanteController.createParticipante);
router.put("/participantes/:id", participanteController.updateParticipante);
router.delete("/participantes/:id", participanteController.deleteParticipante);

// Rotas para Feedback
router.get("/feedbacks", feedbackController.getAllFeedbacks);
router.get("/feedbacks/:id", feedbackController.getAllFeedbackByEvento);
router.post("/feedbacks", feedbackController.createFeedback);

// Rotas para Certificado
router.get("/certificados", certificadoController.getAllCertificados);
router.post("/certificados", certificadoController.createCertificado);

export default router;
