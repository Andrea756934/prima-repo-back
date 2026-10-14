import { Router } from "express";
import { list, me } from "./user.controller";
import { isAuthenticated } from "../../lib/auth/authenticated-middleware";

const router = Router();

router.get('/', list);
router.get('/me', isAuthenticated, me);

export default router;