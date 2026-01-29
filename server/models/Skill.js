const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true }, // Ej: "90%"
    category: { type: String, default: 'Lenguaje' }, // Ej: Frontend, Backend
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', SkillSchema);