import express from 'express';
import brandController from '../controllers/brandController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', brandController.createNewBrand)
    .get('/', brandController.getAllBrands)
    .get('/:slug', brandController.getBrandBySlug)
    .put('/:id', brandController.updateBrand)
    .delete('/:id', brandController.deleteBrand)

export default router;