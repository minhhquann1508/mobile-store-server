import express from 'express';
import categoryController from '../controllers/categoryController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', categoryController.createNewCategory)
    .get('/', categoryController.getAllCategories)
    .get('/:slug', categoryController.getCategoryBySlug)
    .put('/:id', categoryController.updateCategory)
    .delete('/:id', categoryController.deleteCategory);

export default router;