import { Router } from "express";
import { addCliente } from "../controllers/SignUpController.js";
import { novoClienteValidação } from "../middlewares/SignUpMiddleware.js";

const signUpRouter = Router();


signUpRouter.post("/signup",novoClienteValidação, addCliente );


export default signUpRouter;