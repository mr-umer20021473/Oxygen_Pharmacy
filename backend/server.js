import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'; 
import productRouter from './routes/product.routes.js'


dotenv.config();

const port = process.env.PORT

connectDB()
const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/products',productRouter)


app.listen(port,()=> console.log(`Server Running on port ${port}`))