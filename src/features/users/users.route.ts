import {Router} from "express";
import { UserController } from "./users.controller";
import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { authMiddleware } from "../../shared/middlewares/isAuth.middleware";

const router = Router();
const userController = new UserController();

router.get("/all", authMiddleware, isAdminMiddleware, userController.getAllVisitors);
router.get("/profile", authMiddleware, userController.getVisitorById);
router.put("/udpdate", authMiddleware, userController.updateAccount);

export default router;