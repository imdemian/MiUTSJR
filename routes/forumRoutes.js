var ruta = require("express").Router();
const Usuario = require("../models/post");

router.post("/newPost", async (req, res) => {
    try {
        // Destructurar req.body y obtener title, y content
        const { title, content } = req.body;
        // Validar que title, content y rating no esten vacios
        if (!title || !content ) res.redirect("/inicio");
        // Crear nuevo post
		const post = await Post.create({ title, content });
        // Responder con el post creado
		res.status(201).json(post);
	} catch (error) {
        // Manejar error al crear post
		console.error("Error creating post:", error);
		res.status(500).json({ error: "Failed to create post" });
	}
});

// Crar nuevo comentario
// POST REQUEST: /api/posts/:postId/comments
router.post("/posts/:postId/comments", async (req, res) => {
	const { postId } = req.params;
	const { content } = req.body;
	try {
		const post = await Post.findByPk(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		const comment = await Comment.create({ content, postId });
		res.status(201).json(comment);
	} catch (error) {
		console.error("Error creating comment:", error);
		res.status(500).json({ error: "Failed to create comment" });
	}
});

// Traer todos los post
// GET REQUEST: /api/getPosts
router.get("/getPosts", async (req, res) => {
	try {
        // Buscar todos los post
		const posts = await Post.findAll();
        // Responder con los post
		res.status(200).json(posts);
	} catch (error) {
        // Manejar error al traer los post
		console.error("Error retrieving posts:", error);
		res.status(500).json({ error: "Failed to retrieve posts" });
	}
});

module.exports = router;