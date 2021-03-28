"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCacheOnRedis = exports.checkCacheOnRedis = void 0;
const redis_1 = require("../services/redis");
// check results in cache
const checkCacheOnRedis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.search;
    try {
        redis_1.redisClient.get(searchTerm, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (results) {
                return res.status(200).json({
                    code: 200,
                    items: JSON.parse(results),
                });
            }
            next();
        }));
    }
    catch (err) {
        res.status(500).send({ code: 500, message: err.message });
    }
});
exports.checkCacheOnRedis = checkCacheOnRedis;
// clear redis cache
const clearCacheOnRedis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redis_1.redisClient.flushdb(function (err, succeeded) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.status(200).send({ message: "redis cleared successfully" });
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
exports.clearCacheOnRedis = clearCacheOnRedis;
