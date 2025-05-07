import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

const router = Router();

// public routes:
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/:id', authMiddleware, productController.update);

// private routes:
router.post('/', authMiddleware, authorize('admin'), productController.create);
router.delete('/:id', authMiddleware, authorize('admin'), productController.remove);

export default router;
