import { Router } from 'express';
import { chatMessage } from '../controllers/chatBotController.ts';

const router: Router = Router();


router.post('/', chatMessage);

export default router;