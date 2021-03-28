"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRepository = exports.toRepositories = exports.Repository = void 0;
const user_1 = require("./user");
class Repository {
}
exports.Repository = Repository;
const toRepositories = (items) => {
    const repositories = items.map((x) => {
        return exports.toRepository(x);
    });
    return repositories;
};
exports.toRepositories = toRepositories;
const toRepository = (item) => {
    const repository = new (Repository);
    const user = new (user_1.User);
    repository.id = item.id;
    repository.name = item.name;
    repository.url = item.url;
    repository.language = item.language;
    repository.description = item.description;
    repository.forks_count = item.forks_count;
    repository.stargazers_count = item.stargazers_count;
    user.id = item.owner.id;
    user.avatar_url = item.owner.avatar_url;
    user.name = item.owner.login;
    user.type = item.owner.type;
    user.url = item.owner.url;
    repository.owner = user;
    return repository;
};
exports.toRepository = toRepository;
