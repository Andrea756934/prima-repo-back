import { Router } from 'express';
import { isAuthenticated } from '../../lib/auth/authenticated-middleware';
import { create, list } from './classroom.controller';
import { validate } from '../../lib/validation-middleware';
import { createClassroomDto } from './classroom.dto';
import assignmentRouter from './assignments/assignments.routes';

const router = Router();

router.get('/', isAuthenticated, list)
router.post('/', isAuthenticated, validate(createClassroomDto, 'body'), create);
router.use('/:classroomId/assignment', assignmentRouter);

export default router;