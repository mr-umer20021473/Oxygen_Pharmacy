import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT

connectDB()


const app = express()


app.listen(port,()=> console.log(`Server Running on port ${port}`))