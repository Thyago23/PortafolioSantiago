const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

// 1. Importación de rutas
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const postRoutes = require('./routes/posts');

const app = express();

// 2. Middlewares de seguridad y datos
app.use(helmet());
app.use(cors());
app.use(express.json());

// 3. Registro de rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/posts', postRoutes);

// 4. Conexión a MongoDB Atlas
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => console.log('✅ Database Connected'))
    .catch(err => console.error('❌ Database Error:', err));
}

// Ruta base
app.get('/', (req, res) => {
    res.send('API de Santiago Cedeño - Operacional');
});

app.get('/api', (req, res) => {
    res.json({ message: 'API funcionando' });
});

// Servir archivos estáticos del frontend
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

// SPA fallback - redirige todas las rutas a index.html (excepto /api)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({ msg: 'Ruta no encontrada' });
  }
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 SERVER_OPERATIONAL_PORT: ${PORT}`);
  });
}
module.exports = app;