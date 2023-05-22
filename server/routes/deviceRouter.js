import { Router } from 'express';
import DeviceController from '../controllers/DeviceController.js'
import checkRole from '../middleware/checkRoleMiddleware.js';
const router = new Router();

// todo Добавить удаление товаров

router.post('/', checkRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);
router.post('/:id', DeviceController.createBasketDevice);
//to do delete

export default router;
