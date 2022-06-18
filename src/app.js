require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./config/dbConnection')

db.on("error", () => console.log("Erro na conexão."))
db.once("open", () => console.log("Conectado ao banco."))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.json({mensagem: "Seja bem vindo!"})
})

module.exports = app