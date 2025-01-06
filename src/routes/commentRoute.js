import express from 'express';
import commentController from '../controllers/commentController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', commentController.createComment)
    .put('/:id', commentController.updateComment)
    .get('/:productId', commentController.getCommentsByProduct)
    .delete('/:id', commentController.deleteComment)

export default router;