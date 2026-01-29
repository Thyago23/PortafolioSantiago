const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/authMiddleware');

// @route   GET api/skills (Público: para mostrar en tu portafolio)
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ date: -1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener habilidades' });
    }
});

// @route   POST api/skills (Privado: solo tú desde el Dashboard)
router.post('/', auth, async (req, res) => {
    const { name, level, category } = req.body;
    try {
        const newSkill = new Skill({ name, level, category });
        const savedSkill = await newSkill.save();
        res.json(savedSkill);
    } catch (err) {
        res.status(500).json({ msg: 'Error al guardar habilidad' });
    }
});

module.exports = router;