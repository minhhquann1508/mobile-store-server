import express from 'express';
import userController from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';
import checkPermission from '../middleware/checkRole.js';

const router = express.Router();

router
    .post('/', verifyToken, checkPermission('admin'), userController.createAdminUser)
    .get('/', verifyToken, checkPermission('admin'), userController.getAllUsers)
    .get('/current-user', verifyToken, userController.getCurrentUser)
    .put('/update-user', verifyToken, userController.updateUser)
    .put('/update-status', userController.changeUserStatus)
    .get('/:id', userController.getUserById)

export default router;