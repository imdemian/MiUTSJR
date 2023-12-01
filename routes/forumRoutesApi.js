const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { firebaseDatabase } = require("../db/forumBd");
// const { admin } = require("../middlewares/password");


router.post("/api/newPost", async (req, res) => {
    try {
        const { title, content, rating } = req.body;
        // const userId = req.session.usuario.id; 

        if (!title || !content || !rating) {
        }
        const newPost = new Post(null, {
            
            title: title,
            content: content,
            rating: rating,
        });

        await firebaseDatabase.collection("posts").add(newPost.obtenerPost);

        res.status(200).json({ message: "Post creado exitosamente", postId: newPostId });
    } catch (error) {
        console.error("Error al crear post", error);
        res.status(400).json({ error: "Fallo al crear post" });
    }
});

module.exports = router;


router.get("/api/discussions", async (req, res) => {
    const posts = await Post.findAll();

    if (posts.length === 0) {
        res.status(400).json("No se encontraron discusiones");
    } else {
        res.status(200).json(posts);
    }
});


router.post("/api/eliminarPost/:id" , async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await firebaseDatabase.collection("posts").doc(postId).get();

        if (!post.exists) {
            return res.status(404).json({ error: "Post not found" });
        }

        await firebaseDatabase.collection("posts").doc(postId).delete();
        res.status(200).json({ message: "Post borrado Exitosamente" });
    } catch (error) {
        console.error("Error al borrar el Post", error);
        res.status(500).json({ error: "Fallo al borrar el post" });
    }
});

module.exports = router;