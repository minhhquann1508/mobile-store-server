import express from 'express';
import bannerController from '../controllers/bannerController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', bannerController.createBanner)
    .get('/', bannerController.getAllBanner)
    .get('/:id', bannerController.getBannerById)
    .put('/:id', bannerController.updateBanner)
    .delete('/:id', bannerController.deleteBanner)

export default router;