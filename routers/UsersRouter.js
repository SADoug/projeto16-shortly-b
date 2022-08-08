import { Router } from "express";
import { userShortenGet } from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get("/users/:id", userShortenGet);

export default userRouter;