import { Router } from 'express';

import { getStocks, getStock, addStock, updateStock, deleteStock } from '../controllers/stocksController.ts';

const router: Router = Router();

router.get('/', getStocks);
router.get('/:ticker', getStock);
router.post('/', addStock);
router.put('/:ticker', updateStock);
router.delete('/:ticker', deleteStock);

export default router;