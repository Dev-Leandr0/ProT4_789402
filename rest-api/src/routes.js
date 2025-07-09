import { Router } from 'express';
import { usuario } from './controller.js';

export const router = Router()

router.get('/usuarios', usuario.getAll);
router.post('/usuario', usuario.add);