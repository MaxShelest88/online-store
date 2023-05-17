import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
// authMiddleware проверяет пользователя на авторизованность
router.get('/auth', authMiddleware, UserController.check);
//to do delete

export default router;
