const express = require("express");
const router = express.Router();
const Post = require("../models/post");
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
		// console.log(posts);
		res.render("discussions", { posts });
	} catch (error) {
		console.error("Error al obtener los posts:", error);
		res.redirect("/error");
	}
});

router.post("/eliminar-discusion/:id", async (req, res) => {
    // Obtener el ID de la discusión de los parámetros de la URL
    const idDiscusion = req.params.id;

    try {
        // Realizar la lógica de eliminación de la discusión utilizando el ID
        await Post.destroy({
            where: { id_po: idDiscusion }
        });

        // Redireccionar a la página de discusiones después de eliminar
        res.redirect("/discussions");
    } catch (error) {
        console.error("Error al eliminar la discusión:", error);
        res.redirect("/error");
    }
});


router.post("/eliminar-discusion/:id", async (req, res) => {
    // Obtener el ID de la discusión de los parámetros de la URL
    const idDiscusion = req.params.id;

    try {
        // Realizar la lógica de eliminación de la discusión utilizando el ID
        const deletedRows = await Post.destroy({
            where: { id_po: idDiscusion }
        });

        if (deletedRows > 0) {
            console.log(`Discusión con ID ${idDiscusion} eliminada correctamente`);
        } else {
            console.log(`Discusión con ID ${idDiscusion} no encontrada`);
        }

        // Redireccionar a la página de discusiones después de eliminar
        res.redirect("/discussions");
    } catch (error) {
        console.error("Error al eliminar la discusión:", error);
        res.redirect("/error");
    }
});


module.exports = router;
