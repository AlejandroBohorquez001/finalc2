// src/main.js

// ---- Navegación entre paneles ----
const tabProfesor = document.getElementById('tabProfesor');
const tabEstudiante = document.getElementById('tabEstudiante');
const panelProfesor = document.getElementById('panelProfesor');
const panelEstudiante = document.getElementById('panelEstudiante');

tabProfesor.addEventListener('click', () => {
  tabProfesor.classList.add('activo');
  tabEstudiante.classList.remove('activo');
  panelProfesor.classList.add('activa');
  panelEstudiante.classList.remove('activa');
});

tabEstudiante.addEventListener('click', () => {
  tabEstudiante.classList.add('activo');
  tabProfesor.classList.remove('activo');
  panelEstudiante.classList.add('activa');
  panelProfesor.classList.remove('activa');
});

// ---- Panel Profesor: CRUD completo sobre /api/profesor/notas ----
const BASE_PROFESOR = '/api/profesor/notas';
const resultadoProfesor = document.getElementById('resultadoProfesor');

function leerFormularioNota() {
  return {
    estudianteId: document.getElementById('estudianteId').value.trim(),
    estudianteNombre: document.getElementById('estudianteNombre').value.trim(),
    materia: document.getElementById('materia').value.trim(),
    nota: parseFloat(document.getElementById('notaValor').value)
  };
}

function mostrarProfesor(data) {
  resultadoProfesor.textContent = JSON.stringify(data, null, 2);
}

async function manejarRespuesta(response) {
  const datos = await response.json();
  if (!response.ok) {
    throw new Error(datos.message || `Error HTTP: ${response.status}`);
  }
  return datos;
}

async function listarNotas() {
  try {
    resultadoProfesor.textContent = 'Cargando...';
    const response = await fetch(BASE_PROFESOR);
    const datos = await manejarRespuesta(response);
    mostrarProfesor(datos);
  } catch (error) {
    mostrarProfesor({ error: error.message });
  }
}

async function consultarNota() {
  const id = document.getElementById('notaId').value.trim();
  if (!id) return mostrarProfesor({ error: 'Ingresa el ID de la nota a consultar.' });

  try {
    resultadoProfesor.textContent = 'Consultando...';
    const response = await fetch(`${BASE_PROFESOR}/${id}`);
    const datos = await manejarRespuesta(response);
    mostrarProfesor(datos);
  } catch (error) {
    mostrarProfesor({ error: error.message });
  }
}

async function crearNota() {
  const nota = leerFormularioNota();

  if (!nota.estudianteId || !nota.materia || Number.isNaN(nota.nota)) {
    return mostrarProfesor({ error: 'estudianteId, materia y nota son obligatorios.' });
  }

  try {
    resultadoProfesor.textContent = 'Creando...';
    const response = await fetch(BASE_PROFESOR, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nota)
    });
    const datos = await manejarRespuesta(response);
    mostrarProfesor(datos);
  } catch (error) {
    mostrarProfesor({ error: error.message });
  }
}

async function modificarNota() {
  const id = document.getElementById('notaId').value.trim();
  if (!id) return mostrarProfesor({ error: 'Ingresa el ID de la nota a modificar.' });

  const nota = leerFormularioNota();

  try {
    resultadoProfesor.textContent = 'Modificando...';
    const response = await fetch(`${BASE_PROFESOR}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nota)
    });
    const datos = await manejarRespuesta(response);
    mostrarProfesor(datos);
  } catch (error) {
    mostrarProfesor({ error: error.message });
  }
}

async function eliminarNota() {
  const id = document.getElementById('notaId').value.trim();
  if (!id) return mostrarProfesor({ error: 'Ingresa el ID de la nota a eliminar.' });

  try {
    resultadoProfesor.textContent = 'Eliminando...';
    const response = await fetch(`${BASE_PROFESOR}/${id}`, { method: 'DELETE' });
    const datos = await manejarRespuesta(response);
    mostrarProfesor(datos);
  } catch (error) {
    mostrarProfesor({ error: error.message });
  }
}

document.getElementById('btnListar').addEventListener('click', listarNotas);
document.getElementById('btnConsultar').addEventListener('click', consultarNota);
document.getElementById('btnCrear').addEventListener('click', crearNota);
document.getElementById('btnModificar').addEventListener('click', modificarNota);
document.getElementById('btnEliminar').addEventListener('click', eliminarNota);

// ---- Panel Estudiante: solo consulta sobre /api/estudiante/notas ----
const BASE_ESTUDIANTE = '/api/estudiante/notas';
const resultadoEstudiante = document.getElementById('resultadoEstudiante');

async function consultarNotasEstudiante() {
  const id = document.getElementById('consultaEstudianteId').value.trim();
  if (!id) {
    resultadoEstudiante.textContent = JSON.stringify({ error: 'Ingresa tu ID de estudiante.' }, null, 2);
    return;
  }

  try {
    resultadoEstudiante.textContent = 'Consultando...';
    const response = await fetch(`${BASE_ESTUDIANTE}/${id}`);
    const datos = await manejarRespuesta(response);
    resultadoEstudiante.textContent = JSON.stringify(datos, null, 2);
  } catch (error) {
    resultadoEstudiante.textContent = JSON.stringify({ error: error.message }, null, 2);
  }
}

document.getElementById('btnConsultarNotas').addEventListener('click', consultarNotasEstudiante);
