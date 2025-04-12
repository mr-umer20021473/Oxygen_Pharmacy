import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/',authMiddleware, addProduct);
router.get('/',authMiddleware, getProducts);
router.get('/:id',authMiddleware, getProductById);
router.put('/:id',authMiddleware, updateProduct);
router.delete('/:id',authMiddleware,deleteProduct);




export default router;
