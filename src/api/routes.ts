import { Router } from "express";
import authRouter from './auth/auth.router';
import userRouter from './user/user.routes';
import classroomRouter from './classroom/classroom.routes';

const router = Router();

router.use('/classroom', classroomRouter);
router.use('/user', userRouter);
router.use(authRouter);

export default router;