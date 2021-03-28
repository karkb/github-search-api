"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUser = exports.toUsers = exports.User = void 0;
class User {
}
exports.User = User;
const toUsers = (items) => {
    const users = items.map((x) => {
        return exports.toUser(x);
    });
    return users;
};
exports.toUsers = toUsers;
const toUser = (item) => {
    const user = new (User);
    user.id = item.id;
    user.url = item.url;
    user.name = item.login;
    user.type = item.type;
    user.avatar_url = item.avatar_url;
    return user;
};
exports.toUser = toUser;
