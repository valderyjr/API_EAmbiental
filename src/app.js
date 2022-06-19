require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./config/dbConnection')
const cors = require('cors')

const routes = require('./routes')

db.on("error", () => console.error("Connection error"))
db.once("open", () => console.log("Connected to mongoDB."))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

routes(app)

module.exports = app