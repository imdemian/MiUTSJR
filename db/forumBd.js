// const { admin, autorizado} = require("../middlewares/password");
const admin = require("firebase-admin");
// var Post = require("../models/post");
// var fs = require('fs/promises')
const { conexion } = require("./conexion");

const firebaseDatabase = admin.firestore();

// async function buscarPorID(id) {
//     var post;
//     try {
//         var postBD = await conexion.doc(id).get();
        
//         var postObjeto = new Post(postBD.id,postBD.data());
//             if (postObjeto.bandera==0) {
//             post = postObjeto.obtenerPost;
//         }
//     } catch (err) {
//         console.log("Error al buscar el post " + err);
//         user = null;
//     }
//     return user;
// }

// async function modificarPost(datos) {
//     var post = await buscarPorID(datos.id);
//     var error = 1;
//         var post = new Post(datos.id, datos);
//         if (post.bandera == 0) {
//             try {
//                 await conexion.doc(post.id).set(post.obtenerPost);
//                 console.log("Post actualizado correctamente");
//                 error = 0;
//             } catch (err) {
//                 console.log("Error al modificar el post " + err);
//             }
//         }
//         else {
//             console.log("Los datos no son correctos");
//         }
//         return error;
//     }
    

module.exports = { 
    // buscarPorID,
    // modificarPost,
    conexion,
    firebaseDatabase
 };