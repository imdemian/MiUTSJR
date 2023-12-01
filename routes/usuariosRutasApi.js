var ruta=require("express").Router();
var {subirArchivoU}=require("../middlewares/middlewares");
const conexion = require("../db/conexion");

var {mostrarUsuarios, nuevoUsuario, buscarPorID, modificarUsuario, borrarUsuario, login,buscarPerfil} = require("../db/usuariosBD");

ruta.get("/api/mostrarPerfil/:id",async(req,res)=>{
    usuarios= await buscarPerfil(req.params.id)
    if(usuarios==""){
        res.status(400).json("usuario no encontrado");
     }else{
        res.status(200).json(usuarios);
     }
});


ruta.post("/api/nuevousuario",subirArchivoU(), async(req,res)=>{
    if (req.body.admin === undefined) {
        req.body.admin = false; 
    }
    if (req.file) {
        req.body.foto = req.file.filename;
    } else {
        // Asignar un valor predeterminado en caso de que no se proporcione una imagen
        req.body.foto = "perfil.jpg"; // Reemplaza con el nombre que desees
    }

   var error=await nuevoUsuario(req.body);
   if(error==0){
      res.status(200).json("Usuario registrado correctamente");
   }else{
      res.status(400).json("Error al registrar el usuario");
   }
});

ruta.get("/api/borrarUsuario/:id",async(req,res)=>{
    var error=await borrarUsuario(req.params.id);
    if(error==0){
       res.status(200).json("Usuario borrado");
    }else{
       res.status(400).json("Error al borrar el Usuario")
    }
 });

 ruta.post("/api/editarUsuario", subirArchivoU(), async (req, res) => {
    if (req.file != null) {
        req.body.foto = req.file.filename;
    } else {
        req.body.foto = req.body.fotoAnterior;
        
    }
    console.log(req.body.foto);
    var error = await modificarUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario actualizado correctamente");
     }else{
        res.status(400).json("Error al actualizar el Usuario");
     }
});


module.exports=ruta;