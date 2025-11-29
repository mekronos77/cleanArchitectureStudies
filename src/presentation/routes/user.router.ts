import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

const userController = new UserController();

router.route("/user").post(userController.createAccount);

export default router;
