import express from "express";
import searchGithub from "../controllers/search";
import { checkCacheOnRedis, clearCacheOnRedis } from "../middlewares/redis";

const router = express.Router();

router.post("/search", checkCacheOnRedis, searchGithub);
router.get("/clear-cache", clearCacheOnRedis);

export default router;
