var ruta = require("express").Router();
var {subirArchivoU} = require("../middlewares/middlewares");
var {autorizado} = require("../middlewares/password");
var {mostrarUsuarios, nuevoUsuario, buscarPorID, modificarUsuario, borrarUsuario, login,buscarPerfil} = require("../db/usuariosBD");
const Usuario = require("../models/usuario");

ruta.get("/", autorizado, async(req, res)=> {
    var usuarios = await mostrarUsuarios();
    res.render("Usuarios/login", {usuarios});
});

ruta.get("/nuevoUsuario", (req, res) => {
    res.render("Usuarios/nuevo");
})

ruta.post("/nuevoUsuario", subirArchivoU(), async (req, res) => {
    if (req.body.admin === undefined) {
        req.body.admin = false; 
    }
    if (req.file) {
        req.body.foto = req.file.filename;
    } else {
        // Asignar un valor predeterminado en caso de que no se proporcione una imagen
        req.body.foto = "perfil.jpg"; // Reemplaza con el nombre que desees
    }

    var error = await nuevoUsuario(req.body);
    res.redirect("/");
});


ruta.get("/login",(req,res)=>{
    res.render("Usuarios/login")
});

ruta.post("/login",async(req,res)=>{
    var user = await login(req.body);

    if(user==undefined){
       res.redirect("/login");
    }else{
       if(user.admin){
          console.log("Administrador");
          //console.log(user);
          req.session.admin=req.body.usuario;
          res.redirect("/inicio/true");
       }else{
          console.log("usuario");
          //console.log(user);
          req.session.usuario=req.body.nombre;
          req.session.id=user.id
          res.redirect("/inicio");
       }
    }
 });

 ruta.get("/inicio",async (req, res) => {
    res.render("inicio/inicio"); 
});

ruta.get("/inicio/:isAdmin", (req, res) => {
    req.session.isAdmin=req.params.isAdmin;
    res.render("inicio/inicio"); 
});

 ruta.get("/inicio", (req, res) => {
    res.render("inicio/inicio"); 
});

ruta.get("/perfil", async (req, res) => {
    console.log("id ---------------");
    console.log(req.session.id);
    usuarios= await buscarPerfil(req.session.id)
    res.render("inicio/perfil",{usuarios}); 
});
 

 ruta.get("/logout",(req,res)=>{
    req.session=null;
    res.redirect("/login");
 });

 ruta.get("/editarUsuario/:id", async (req, res) => {
    var user = await buscarPorID(req.params.id);
    res.render("Usuarios/modificar", {user});
} );

ruta.post("/editarUsuario",subirArchivoU(), async (req, res) => {
    //console.log(req.file);
   if(req.file!=null){
    //console.log("file name");
    //console.log(req.filename);
    req.body.foto = req.file.filename;
   }
   else{
    req.body.foto = req.body.fotoAnterior
   }
   console.log(req.body.foto);
    var error = await modificarUsuario(req.body);
    res.redirect("/login");
    //res.end();
});

ruta.post("/editarUsuario",autorizado, subirArchivoU(), async (req, res) => {
    if (req.file != null) {
        req.body.foto = req.filename;
    } else {
        req.body.foto = req.body.fotoAnterior;
    }
    var error = await modificarUsuario(req.body);
    res.redirect("/");
});

ruta.get("/perfil",autorizado, async (req, res) => {
    console.log("id ---------------");
    console.log(req.session.id);
    usuarios= await buscarPerfil(req.session.id)
    foto = req.session.foto
    res.render("inicio/perfil",{usuarios,foto}); 
});

ruta.get("/logout",(req,res)=>{
    req.session=null;
    res.redirect("/login");
 });

ruta.get("/borrarUsuario/:id", async (req, res) => {
    try {
        await borrarUsuario(req.params.id);
        res.redirect("/inicio");
    } catch (err) {
        console.log("Error al borrar el usuario " + err);
    }
});

ruta.get("/foro", (req, res) => {
	res.render("inicio/foro");
});

module.exports = ruta;