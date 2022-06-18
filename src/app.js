const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.json({mensagem: "Seja bem vindo!"})
})

module.exports = app