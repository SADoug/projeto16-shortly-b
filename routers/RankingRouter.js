import { Router } from "express";
import { RankingGet } from "../controllers/RankingControllers.js";

const rankingRouter = Router();

rankingRouter.get("/ranking", RankingGet);

export default rankingRouter;