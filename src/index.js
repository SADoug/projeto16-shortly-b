import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import signUpRouter from "../routers/SignUpRouter.js";
import signInRouter from "../routers/SignInRouter.js";
import urlRouter from "../routers/URLRouters.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(signUpRouter)
app.use(signInRouter)
app.use(urlRouter)


const port = process.env.PORT || 4000
app.listen(port, () =>
  console.log(chalk.bold.green(`Server online on port http://localhost:${port} !`))

);