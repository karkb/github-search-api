"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.initRedis = void 0;
const redis_1 = __importDefault(require("redis"));
let redisClient;
exports.redisClient = redisClient;
// begain init Redis //
const initRedis = () => {
    const redisPort = 6379;
    exports.redisClient = redisClient = redis_1.default.createClient(redisPort);
    redisClient.on("error", (err) => {
        console.log(err);
    });
};
exports.initRedis = initRedis;
