import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id',deleteProduct);




export default router;
