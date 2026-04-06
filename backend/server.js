import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})