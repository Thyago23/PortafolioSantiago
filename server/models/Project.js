const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String], // Unificado con el frontend 
    status: { type: String, default: 'beta' },
    githubLink: { type: String, default: '' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);