import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import signUpRouter from "../routers/SignUpRouter.js";
import signInRouter from "../routers/SignInRouter.js";
import urlRouter from "../routers/URLRouters.js";
import userRouter from "../routers/UsersRouter.js";
import rankingRouter from "../routers/RankingRouter.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(signUpRouter)
app.use(signInRouter)
app.use(urlRouter)
app.use(userRouter)
app.use(rankingRouter)


const port = process.env.PORT || 4000
app.listen(port, () =>
  console.log(chalk.bold.green(`Server online on port http://localhost:${port} !`))

);