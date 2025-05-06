import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.remove);

export default router;