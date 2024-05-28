require("dotenv").config();
const conn = require("./db/conn");
const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo");
const express = require("express");
const exphbs = require ("express-handlebars");

//instanciação do server
const app = express();

//vinculação do handlebars ao express:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars")

// Middleware para analisar o corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res)=>{
    res.render("home")
});

app.get("/usuarios", async (req,res)=>{
    const usuarios = await Usuario.findAll({ raw: true})
    res.render("usuarios", { usuarios });

});

app.get("/usuarios/novo", (req ,res )=>{
    res.render("formUsuario")
});

app.post("/usuarios/novo", async (req, res) => {
    try {
        const { nickname, nome } = req.body;
        const dadosUsuario = {
            nickname,
            nome,
        };
        const usuario = await Usuario.create(dadosUsuario);
        res.send("Usuário inserido sob o id " + usuario.id);
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        res.status(500).send("Erro ao inserir usuário");
    }
});

app.get("/cadastrarJogo", (req, res) => {
    res.sendFile(`${__dirname}/views/formJogo.html`);
});
app.post('/cadastrarJogo', async (req, res) => {

    try {
      const { titulo, descricao, precoBase } = req.body;
      const dadosJogo = 
      {
        titulo, 
        descricao, 
        precoBase,
    };
    
    const novoJogo = await Jogo.create(dadosJogo);
     console.log(novoJogo)
      res.send('Jogo inserido sob o id' + id);
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      res.status(500).send('Erro ao cadastrar jogo.');
    }
});

app.get("/usuarios/:id/update", async (req,res)=>{
    const id= parseInt(req.params.id);
    const usuario = Usuario.findByPk=(id, {raw: true}) 

    res.render("formUsuario", {usuario})
})

app.post("/usuarios/:id/update", async (req,res)=>{
    const id = paramsInt(req.params.id);
    const { nickname, nome } = req.body;
        const dadosUsuario = {
            nickname: req.body.nickname,
            nome: req.body.nome,
    }
const retorno = await Usuario.update({where:{id: id}},)
if(retorno>0){
    res.redirect("usuarios")
}
else{
    res.send("Erro ao atualizar o usuário")
}
})

app.listen(8000, () => {
    console.log("Servidor está ouvindo na porta 8000");
});

conn
    .sync()
    .then(() => {
        console.log("Conectado e sincronizado ao banco de dados com sucesso!");
    })
    .catch(err => {
        console.error("Ocorreu um erro ao conectar/sincronizar o banco de dados:", err);
    });