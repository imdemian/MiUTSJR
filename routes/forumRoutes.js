const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { firebaseDatabase } = require("../db/forumBd");

router.post("/newPost", async (req, res) => {
    try {
        const { title, content, rating } = req.body;
        // const userId = req.session.usuario.id; 

        if (!title || !content || !rating) {
            return res.redirect("/foro");
        }
        const newPost = new Post(null, {
            
            title: title,
            content: content,
            rating: rating,
        });

        await firebaseDatabase.collection("posts").add(newPost.obtenerPost);

        res.redirect("/discussions");
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});

router.get("/discussions", async (req, res) => {
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
