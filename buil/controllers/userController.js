"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middleware/auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const uuid_1 = __importDefault(require("uuid"));
const database_1 = require("../database/database");
const auth_2 = require("../utils/auth");
const router = express_1.default.Router();
router.get(`/users`, auth_1.Authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const users = yield database_1.db.select('id').from('users');
    return res.json(users);
}));
router.get(`/users/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield database_1.db
        .select('id')
        .from('users')
        .where({ id });
    return res.send('users');
}));
router.post(`/users/register`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    const id = yield uuid_1.default.v4();
    const hash = yield bcryptjs_1.default.hash(password, 10);
    database_1.db('users')
        .insert({
        id,
        hash,
        email
    })
        .returning('*')
        .then((user) => __awaiter(this, void 0, void 0, function* () {
        const { id, email, name } = user[0];
        const token = yield auth_2.generateToken(id);
        const userInfo = {
            email
        };
        res.header('authorization', `${token}`).json(userInfo);
    }));
}));
router.post(`/users/login`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    return database_1.db
        .select('*')
        .from('users')
        .where('email', '=', email)
        .then((user) => __awaiter(this, void 0, void 0, function* () {
        const { hash, name, email, id } = user[0];
        const isValid = yield bcryptjs_1.default.compare(password, hash);
        if (isValid) {
            const token = yield auth_2.generateToken(id);
            let userInfo = {
                email,
                name
            };
            res.header('authorization', `${token}`).json(userInfo);
        }
        else {
            res.status(400).json('Invalid credentials');
        }
    }))
        .catch((e) => res.status(400).json('User not found'));
}));
router.get(`/users/logout`, auth_1.Authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json('already logged out');
}));
router.delete(`/users/:id`, auth_1.Authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { Authorization } = req.headers;
    const authId = auth_2.findByToken(`${Authorization}`);
    const { id } = req.params;
    const user = yield database_1.db('users')
        .where({ id })
        .del();
    return res.send('res');
}));
exports.default = router;
