import express from 'express';
import userController from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .get('/', userController.getAllUsers)
    .get('/current-user', verifyToken, userController.getCurrentUser)
    .put('/update-user', verifyToken, userController.updateUser)
    .put('/update-status', userController.changeUserStatus)
    .get('/:id', userController.getUserById)

export default router;