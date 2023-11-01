var admin = require("firebase-admin");
var keys = require("../miutsjr.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var db = admin.firestore();
var conexion = db.collection("miUTSJR");

module.exports= {
    conexion
};