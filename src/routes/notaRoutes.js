// src/routes/notaRoutes.js
// Rutas del rol "profesor": CRUD completo sobre las notas.
const express = require('express');
const router = express.Router();
const notaController = require('../controllers/notaController');

router.get('/', notaController.getNotas);           // Listar todas las notas
router.get('/:id', notaController.getNotaById);      // Consultar una nota puntual
router.post('/', notaController.createNota);         // Registrar una nota nueva
router.put('/:id', notaController.updateNota);        // Modificar una nota existente
router.delete('/:id', notaController.deleteNota);      // Eliminar una nota

module.exports = router;
