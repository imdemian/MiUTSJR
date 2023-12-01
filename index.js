var express = require("express");
const bodyParser = require('body-parser');
var path = require("path");
var cors = require("cors");
var session = require("cookie-session");
var forumRoutes = require("./routes/forumRoutes");
var usuariosRutas = require("./routes/usuariosRutas");

var app = express();
app.set("view engine", "ejs");
app.set(cors());
app.use(session({
    name:"session",
    keys:["hjfgsdjiminbn"],
    maxAge:24*60*1000
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use(express.static('public', { 'extensions': ['css'] }));
app.use("/", usuariosRutas);
app.use("/",forumRoutes);


var port= process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});