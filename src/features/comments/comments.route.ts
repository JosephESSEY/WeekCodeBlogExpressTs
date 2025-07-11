import { Router } from "express";
import { CommentController } from "./comments.controller";
import { authMiddleware } from "../../shared/middlewares/isAuth.middleware";

const router = Router();
const commentController = new CommentController();

router.post("/", authMiddleware, commentController.createComment);

router.get("/article/:article_id", commentController.getCommentsByArticle);

router.delete("/:id", authMiddleware, commentController.deleteComment);

export default router;
