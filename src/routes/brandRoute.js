import express from 'express';
import brandController from '../controllers/brandController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router
    .post('/', brandController.createNewBrand)

export default router;