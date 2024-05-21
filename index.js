require ("dotenv").config();
const conn = require ("./db/conn")

const Usuario = require("./models/Usuario")

conn
 .sync()
 .then(()=> {
    console.log("Conectado e sincronizado com o banco de dados!")
 })

.catch ((err)=>{
    console.log("Erro ao conectar: " + err)
})