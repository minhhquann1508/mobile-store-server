import express from 'express';
import productController from '../controllers/productController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .get('/', productController.getAllProducts)
    .post('/', productController.createProduct)
    .get('/pagination', productController.getProductsPagination)
    .post('/add-to-wishlist', verifyToken, productController.addToWishlist)
    .post('/add-to-cart', verifyToken, productController.addToCart)
    .get('/:id', productController.getProductById)
    .put('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct)

export default router;