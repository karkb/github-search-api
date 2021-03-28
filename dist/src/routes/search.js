"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_1 = __importDefault(require("../controllers/search"));
const redis_1 = require("../middlewares/redis");
const router = express_1.default.Router();
router.post("/search", redis_1.checkCacheOnRedis, search_1.default);
router.get("/clear-cache", redis_1.clearCacheOnRedis);
exports.default = router;
