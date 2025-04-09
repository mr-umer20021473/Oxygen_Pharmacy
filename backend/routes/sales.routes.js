import express from 'express';
import { addSale } from '../controllers/sales.controller.js';
const router = express.Router();

router.post('/', addSale);





export default router;
