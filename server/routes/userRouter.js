import { Router } from 'express';
import UserController from '../controllers/UserController.js';
const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', UserController.check);
//to do delete

export default router;
