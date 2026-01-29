const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Aquí irá el texto largo
    category: { type: String, required: true }, // Ej: "Backend", "Seguridad"
    author: { type: String, default: 'Santiago Cedeño' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);