import { Router } from 'express';
import brandController from '../controllers/brandController.js';
const router = new Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);
//to do delete

export default router;
