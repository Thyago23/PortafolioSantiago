const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, async (req, res) => {
    try {
        const { title, description, technologies, githubLink, status } = req.body;
        const newProject = new Project({ title, description, technologies, githubLink, status });
        await newProject.save();
        res.json({ msg: "Proyecto guardado", project: newProject });
    } catch (err) {
        res.status(500).send('Error al guardar en base de datos');
    }
});

module.exports = router;