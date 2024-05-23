require ("dotenv").config();
const conn = require ("./db/conn")

const Usuario = require("./models/Usuario")

const express = require ("express");
const app = express();

app.use(
    express.urlencoded({
        extend: true,
    })
);

app.use(express.json())

app.get("/usuarios/novo", (req,res)=>{
    res.sendFile(`${__dirname}/views/formUsuario.html`);
});

app.post("/usuarios/novo", async (req, res) => {
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };

    const usuario = await Usuario.create(dadosUsuario);
    res.send("Uduário inserido sob o id" + usuario.id);
})

app.listen (8000, ()=>{
    console.log("Server rodando!")
})
conn
 .sync()
 .then(()=> {
    console.log("Conectado e sincronizado com o banco de dados!")
 })

.catch ((err)=>{
    console.log("Erro ao conectar: " + err)
})