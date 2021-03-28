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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../services/redis");
const repository_1 = require("../transformers/repository");
const user_1 = require("../transformers/user");
const allowedSearchType = ["users", "repositories", "issues"];
const searchGithub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchType = req.query.searchType;
    const searchText = req.query.searchText;
    // check if search type is allowed
    var searchTypeExists = allowedSearchType.includes(searchType.toLowerCase());
    if (!searchTypeExists) {
        return res.status(400).send({ code: 400, message: "search type is not allowed" });
    }
    // call Github API
    try {
        const results = yield axios_1.default.get(`${process.env.GITHUB_API_URL}/search/${searchType}?q=${searchText}`);
        redis_1.redisClient.setex(searchText, 7200, JSON.stringify(results.data.items));
        // return the requested entity 
        let items = [];
        if (searchType === "users") {
            items = user_1.toUsers(results.data.items);
        }
        else if (searchType === "repositories") {
            items = repository_1.toRepositories(results.data.items);
        }
        else {
            // to return github issues
            items = results.data.items;
        }
        res.status(200).json({
            code: 200,
            items,
        });
    }
    catch (err) {
        res.status(500).send({ code: 500, message: err.message });
    }
});
exports.default = searchGithub;
