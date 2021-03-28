"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const search_1 = __importDefault(require("../src/routes/search"));
const redis_1 = require("../src/services/redis");
require('dotenv').config();
redis_1.initRedis();
const app = express_1.default();
// allow localhost with port 3000 
var corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors_1.default(corsOptions));
app.use('/api', search_1.default);
app.listen(process.env.PORT || 5001, () => {
    console.log(`Node server started at port: ${process.env.PORT}`);
});
