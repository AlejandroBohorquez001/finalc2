// src/app.js
const express = require('express');
const path = require('path');
const notaRoutes = require('./routes/notaRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // sirve index.html y /src/main.js

// Profesor: CRUD completo de notas
app.use('/api/profesor/notas', notaRoutes);

// Estudiante: solo consulta de sus notas
app.use('/api/estudiante/notas', estudianteRoutes);

module.exports = app;
