const express = require("express");
const router = express.Router();
const Post = require("../models/post");
var {autorizado} = require("../middlewares/password");
const { firebaseDatabase } = require("../db/forumBd");
// const { admin } = require("../middlewares/password");

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
		//console.log(req.session.isAdmin);
		res.render("discussions", { posts,isAdmin:req.session.isAdmin });
	} catch (error) {
		console.error("Error al obtener los posts:", error);
		res.redirect("/error");
	}
});

router.post("/eliminarPost/:id",autorizado,async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await firebaseDatabase.collection("posts").doc(postId).get();
        if (!post.exists) {
            return res.status(404).json({ error: "Post not found" });
        }
        await firebaseDatabase.collection("posts").doc(postId).delete();
        res.redirect("/discussions");
    } catch (error) {
        console.error("Failed to delete post", error);
        res.redirect("/error");
    }
});

router.get("/editarPost/:id", autorizado, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await firebaseDatabase.collection("posts").doc(postId).get();

        if (!post.exists) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Renderiza la vista de edición de post con la información del post
        res.render("/post/editarPost", { post: post.data() });
    } catch (error) {
        console.error("Error al obtener el post para editar:", error);
        res.redirect("/error");
    }
});

router.post("/editarPost/:id", autorizado, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, rating } = req.body;

        // if (!title || !content || !rating) {
        //     return res.redirect(`/editarPost/${postId}`);
        // }

        const updatedPost = {
            title: title,
            content: content,
            rating: rating,
        };

        await firebaseDatabase.collection("posts").doc(postId).update(updatedPost);

        res.redirect("/discussions");
    } catch (error) {
        console.error("Error al editar el post:", error);
        res.redirect("/error");
    }
});

module.exports = router;
