import express from 'express';

import * as authController from '~/controllers/auth';

const router = express.Router();

router.use('/auth', authController.itWorks);

export default router;