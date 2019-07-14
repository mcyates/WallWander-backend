"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../utils/auth");
exports.Authenticate = (req, res, next) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
        return res.status(401).json('unauthorized');
    }
    const user = auth_1.findByToken(Authorization);
    if (!user) {
        return res.status(401).json('User does not exist');
    }
    next();
    return;
};
