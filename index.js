var express = require("express");
var path = require("path");
var cors = require("cors");
var session = require("cookie-session");
var usuariosRutas = require("./routes/usuariosRutas");

var app = express();
app.set("view engine", "ejs");
app.set(cors());
app.use(session({
    name:"session",
    keys:["hjfgsdjiminbn"],
    maxAge:24*60*1000
}));

app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use(express.static('public', { 'extensions': ['css'] }));
app.use("/", usuariosRutas);

var port= process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});