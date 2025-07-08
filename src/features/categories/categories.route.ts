import { CategorieController } from "./categories.controller";
import { Router } from "express";
import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { authMiddleware } from "../../shared/middlewares/isAuth.middleware";

const router = Router();
const categoriesController = new CategorieController();

router.get('/', categoriesController.ListeCategorie);
router.post('/create', authMiddleware, isAdminMiddleware, categoriesController.createCategorie);
router.delete('/delete', authMiddleware, isAdminMiddleware, categoriesController.DeleteCategorie);
router.put('/update', authMiddleware, isAdminMiddleware, categoriesController.updateCategorie);

export default router;