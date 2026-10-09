// src/controllers/notaController.js
// CRUD completo de notas. Pensado para el rol "profesor".
const NotaModel = require('../models/notaModel');

const getNotas = (req, res) => {
  try {
    const notas = NotaModel.getAll();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

const getNotaById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const nota = NotaModel.getById(id);

    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json(nota);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar la nota', error: error.message });
  }
};

const createNota = (req, res) => {
  try {
    const { estudianteId, estudianteNombre, materia, nota, profesorId, fecha } = req.body;

    if (!estudianteId || !materia || nota === undefined || nota === null) {
      return res.status(400).json({
        message: 'Los campos estudianteId, materia y nota son obligatorios'
      });
    }

    if (typeof nota !== 'number' || nota < 0 || nota > 5) {
      return res.status(400).json({ message: 'La nota debe ser un número entre 0 y 5' });
    }

    const nuevaNota = NotaModel.create({
      estudianteId: parseInt(estudianteId, 10),
      estudianteNombre: estudianteNombre || '',
      materia,
      nota,
      profesorId: profesorId ? parseInt(profesorId, 10) : null,
      fecha: fecha || new Date().toISOString().split('T')[0]
    });

    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', error: error.message });
  }
};

const updateNota = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (req.body.nota !== undefined && (typeof req.body.nota !== 'number' || req.body.nota < 0 || req.body.nota > 5)) {
      return res.status(400).json({ message: 'La nota debe ser un número entre 0 y 5' });
    }

    const notaActualizada = NotaModel.update(id, req.body);

    if (!notaActualizada) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json(notaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', error: error.message });
  }
};

const deleteNota = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const eliminada = NotaModel.delete(id);

    if (!eliminada) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({ message: 'Nota eliminada correctamente', nota: eliminada });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', error: error.message });
  }
};

module.exports = {
  getNotas,
  getNotaById,
  createNota,
  updateNota,
  deleteNota
};
