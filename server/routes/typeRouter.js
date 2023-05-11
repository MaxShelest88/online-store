import { Router } from 'express';
import TypeController from '../controllers/TypeController.js';
const router = new Router();

router.post('/', TypeController.create);
router.get('/', TypeController.getAll);
//to do delete

export default router;
