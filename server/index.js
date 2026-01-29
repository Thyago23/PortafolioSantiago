const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// 1. Importación de rutas
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills'); // Nueva ruta para tus lenguajes

const app = express();

// 2. Middlewares de seguridad y datos
app.use(helmet());
app.use(cors());
app.use(express.json());

// 3. Registro de rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes); // Activación de la sección de habilidades
app.use('/api/posts', require('./routes/posts'));

// 4. Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ >>> SYSTEM_DATABASE_ONLINE: Conexión exitosa a Cluster0'))
    .catch(err => console.error('❌ >>> CRITICAL_DATABASE_ERROR:', err));

// Ruta base de cortesía
app.get('/', (req, res) => {
    res.send('API de Santiago Cedeño - Operacional con Proyectos y Skills');
});

// 5. Configuración del Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 >>> SERVER_OPERATIONAL_PORT: ${PORT}`);
});