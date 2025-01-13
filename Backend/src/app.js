import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cors(
     origin = `${process.env.CORS_URL}`,
     credentials = true,

))

app.use(express.json({ limit: "16kb" })) //to send data into json formate 
app.use(express.urlencoded({ extended: true, limit: "16kb" }))//to send data into urlencoded formate
app.use(express.static("public"))//to send static files/assets 
app.use(cookieParser())
export default app