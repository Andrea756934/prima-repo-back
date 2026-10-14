import { Router } from "express";
import { isAuthenticated } from "../../../lib/auth/authenticated-middleware";
import { list, create, completed } from "./assignments.controller";
import { validate } from "../../../lib/validation-middleware";
import { createAssignmentDto } from "./assignments.dto";

const router = Router({ mergeParams: true });

router.get('/', isAuthenticated, list)
router.post('/', isAuthenticated, validate(createAssignmentDto, 'body'), create);
router.put('/:id', isAuthenticated, completed);

export default router;