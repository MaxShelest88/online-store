import { Router } from 'express';
import TypeController from '../controllers/TypeController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';
const router = new Router();

router.post('/', checkRole('ADMIN'), TypeController.create);
router.get('/', TypeController.getAll);
//to do delete

export default router;
