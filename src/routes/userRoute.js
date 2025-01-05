import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserById)

export default router;