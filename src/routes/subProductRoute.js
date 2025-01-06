import express from 'express';
import subProductController from '../controllers/subProductController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', subProductController.createNewSubProduct)
    .get('/:productId', subProductController.getSubProductById)
    .put('/:id', subProductController.updateSubProduct)
    .delete('/:id', subProductController.deleteSubProduct)

export default router;