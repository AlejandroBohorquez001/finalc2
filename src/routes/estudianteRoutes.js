// src/routes/estudianteRoutes.js
// Rutas del rol "estudiante": únicamente consulta, sin crear/editar/eliminar.
const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.get('/:estudianteId', estudianteController.getNotasPorEstudiante);

module.exports = router;
