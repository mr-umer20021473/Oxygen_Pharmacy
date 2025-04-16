// app.js
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import salesRouter from './routes/sales.routes.js'
import statsRouter from './routes/stats.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/sales',salesRouter)
app.use('/api/stats',statsRouter)


export default app;
