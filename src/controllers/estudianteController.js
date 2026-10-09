// src/controllers/estudianteController.js
// Solo lectura. El estudiante únicamente puede consultar sus propias notas.
const NotaModel = require('../models/notaModel');

const getNotasPorEstudiante = (req, res) => {
  try {
    const estudianteId = parseInt(req.params.estudianteId, 10);
    const notas = NotaModel.getByEstudiante(estudianteId);

    if (notas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron notas para este estudiante' });
    }

    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar las notas', error: error.message });
  }
};

module.exports = {
  getNotasPorEstudiante
};
