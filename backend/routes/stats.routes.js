import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getStats } from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/',authMiddleware, getStats);

export default router;
