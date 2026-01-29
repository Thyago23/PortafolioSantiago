const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// RUTA DE REGISTRO (Úsala una vez para crearte y luego bórrala o protégela)
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: "Usuario administrador creado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// RUTA DE LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "El usuario no existe" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

        // Firmar el Token usando la JWT_SECRET que inventaste
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;