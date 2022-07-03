import { lookInput, createInput, lookOutput, createOutput } from '../controllers/transactionsController.js';
import { Router } from 'express';

const router = Router();

router.get('/input', lookInput);
router.post('/input', createInput);
router.get('/output', lookOutput);
router.post('/output', createOutput);

export default router;