import { Router } from "express";
import { sigInValidação } from "../middlewares/SignInMiddleware.js";
import { SignInCliente } from "../controllers/SignInController.js";

const signInRouter = Router();


signInRouter.post("/signin", sigInValidação, SignInCliente );


export default signInRouter;