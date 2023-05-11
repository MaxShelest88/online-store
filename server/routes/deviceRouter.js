import { Router } from 'express';
import DeviceController from '../controllers/DeviceController.js';
const router = new Router();

router.post('/', DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);
//to do delete

export default router;
