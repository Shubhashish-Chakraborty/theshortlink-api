import { Router } from "express";
import { signin, signup } from "../controllers/authController";

export const authRouter = Router();

authRouter.route('/signup').post(signup);
authRouter.route('/signin').post(signin);