// src/models/notaModel.js
// Simulación de base de datos en memoria (no persiste al reiniciar el servidor)

let notasDB = [
  { id: 1, estudianteId: 1, estudianteNombre: 'Carlos', materia: 'Matemáticas', nota: 4.5, profesorId: 1, fecha: '2026-09-01' },
  { id: 2, estudianteId: 2, estudianteNombre: 'Ana', materia: 'Matemáticas', nota: 3.8, profesorId: 1, fecha: '2026-09-01' },
  { id: 3, estudianteId: 1, estudianteNombre: 'Carlos', materia: 'Programación', nota: 4.2, profesorId: 2, fecha: '2026-09-05' }
];

let nextId = 4;

class NotaModel {
  static getAll() {
    return notasDB;
  }

  static getById(id) {
    return notasDB.find(nota => nota.id === id);
  }

  static getByEstudiante(estudianteId) {
    return notasDB.filter(nota => nota.estudianteId === estudianteId);
  }

  static create(data) {
    const nuevaNota = {
      id: nextId++,
      ...data
    };
    notasDB.push(nuevaNota);
    return nuevaNota;
  }

  static update(id, data) {
    const index = notasDB.findIndex(nota => nota.id === id);
    if (index === -1) return null;

    notasDB[index] = { ...notasDB[index], ...data };
    return notasDB[index];
  }

  static delete(id) {
    const index = notasDB.findIndex(nota => nota.id === id);
    if (index === -1) return null;

    const [eliminada] = notasDB.splice(index, 1);
    return eliminada;
  }
}

module.exports = NotaModel;
