import { Router } from "express";
import { ArticleController } from "./articles.controller";
import upload from "../../shared/middlewares/uploadFile.middleware";
import { authMiddleware } from "../../shared/middlewares/isAuth.middleware";
import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";

const router = Router();
const articleController = new ArticleController();

router.post(
  "/create",
  authMiddleware,
  isAdminMiddleware,
  upload.single("image"),
  articleController.createArticle
);

router.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  articleController.updateArticle
);

router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  articleController.deleteArticle
);

router.get(
  "/:id",
  articleController.getArticle
);

router.get(
  "/",
  articleController.listArticles
);

export default router;
