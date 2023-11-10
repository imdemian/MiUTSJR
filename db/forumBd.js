const admin = require("firebase-admin");
const { conexion } = require("./conexion");

const firebaseDatabase = admin.firestore();

module.exports = { firebaseDatabase, conexion };
