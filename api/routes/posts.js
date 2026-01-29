const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

// Obtener todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener los posts' });
    }
});

// Crear un nuevo post (Protegido)
router.post('/', auth, async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const newPost = new Post({ title, content, category });
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        res.status(500).json({ msg: 'Error al guardar el post' });
    }
});

// Obtener un post por ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post no encontrado' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Error al obtener el post' });
    }
});

// Eliminar un post (Protegido)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post no encontrado' });
        }
        res.json({ msg: 'Post eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ msg: 'Error al eliminar el post' });
    }
});

// Actualizar un post (Protegido)
router.put('/:id', auth, async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, category },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ msg: 'Post no encontrado' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Error al actualizar el post' });
    }
});

module.exports = router;