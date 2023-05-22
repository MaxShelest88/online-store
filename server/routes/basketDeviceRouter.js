import { Router } from 'express';
import BasketDeviceController from '../controllers/BasketDeviceController.js';
const router = new Router();

router.get('/', BasketDeviceController.getAll);
//to do delete

export default router;
