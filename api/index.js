const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Importación de rutas
const authRoutes = require('../server/routes/auth');
const projectRoutes = require('../server/routes/projects');
const skillRoutes = require('../server/routes/skills');
const postRoutes = require('../server/routes/posts');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/posts', postRoutes);

// Conexión a MongoDB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Database error:', err));
}

// Ruta base
app.get('/api', (req, res) => {
  res.send('API de Santiago Cedeño - Operacional');
});

module.exports = app;
