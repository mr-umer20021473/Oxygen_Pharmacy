import express from 'express';
import { addSale, deleteSale, getAllSales, getSaleById, updateSaleById } from '../controllers/sales.controller.js';
const router = express.Router();

router.post('/', addSale);
router.get('/',  getAllSales);
router.get('/:id',  getSaleById);
router.put('/:id',  updateSaleById);
router.delete('/:id', deleteSale);





export default router;
