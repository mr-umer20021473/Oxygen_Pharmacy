import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'; 
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import salesRouter from './routes/sales.routes.js'


dotenv.config();

const port = process.env.PORT

connectDB()
const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/sales',salesRouter)


app.listen(port,()=> console.log(`Server Running on port ${port}`))