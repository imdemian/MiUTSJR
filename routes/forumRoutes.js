var ruta = require("express").Router();
const post = require("../models/post");

ruta.post("/newPost", async (req, res) => {
	try {
		if (!title || !content || !rating) {
			return res.redirect("/foro"); 
		}
		const post = await Post.create({ title, content, rating });
		res.redirect("/discussions");
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(500).json({ error: "Failed to create post" });
	}
});

ruta.get("/discussions", async (req, res) => {
	try {
		const posts = await Post.findAll();
		console.log(posts);
		res.render("discussions", { posts });
	} catch (error) {
		console.error("Error al obtener los posts:", error);
		res.redirect("/error");
	}
});

module.exports = router;