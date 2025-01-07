import express from 'express';
import orderController from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', verifyToken, orderController.createNewOrder)
    .get('/order-by-user', verifyToken, orderController.getOrdersByUserId)
    .get('/:id', orderController.getOrderById)
    .put('/:id', verifyToken, orderController.updateOrder)

export default router;