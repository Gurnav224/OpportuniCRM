import { Router } from "express";
import { createComment, getComments } from "../controllers/comment.controller.js";

const router = Router();

router.post('/comment', createComment);
router.get('/comment', getComments)

export default router;