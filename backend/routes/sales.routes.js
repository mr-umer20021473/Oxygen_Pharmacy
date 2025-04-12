import express from 'express';
import { addSale, deleteSale, getAllSales, getSaleById, updateSaleById } from '../controllers/sales.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/',authMiddleware, addSale);
router.get('/',authMiddleware,  getAllSales);
router.get('/:id',authMiddleware,  getSaleById);
router.put('/:id',authMiddleware,  updateSaleById);
router.delete('/:id',authMiddleware, deleteSale);





export default router;
