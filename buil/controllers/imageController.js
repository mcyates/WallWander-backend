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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = __importDefault(require("uuid"));
const database_1 = require("../database/database");
const cloudinary_1 = __importDefault(require("../cloudinary"));
const upload = multer_1.default({
    dest: './uploads',
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        const isImage = /\.(?:jpg|jpeg|gif|png|webP)/g;
        if (isImage.test(file.originalname.toLowerCase()) === false) {
            return cb(new Error('file must be a image'), false);
        }
        cb(null, true);
    }
});
exports.router = express_1.default.Router();
exports.router.get(`/images`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const images = yield database_1.db.select('*').from('images');
    return res.json(images);
}));
exports.router.get(`/images/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const image = yield database_1.db
        .select('id')
        .from('images')
        .where({ id });
    return res.send(image);
}));
exports.router.post(`/images/upload`, upload.single('wallpaper'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    const authorId = req.headers.authorization;
    const id = yield uuid_1.default.v4();
    const urls = cloudinary_1.default(req.file);
    console.log(urls);
    res.json(urls).status(201);
}), (error, req, res, next) => {
    res.status(400).json({ error: error.message });
});
exports.router.delete(`/images/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const image = yield database_1.db('images')
        .where({ id })
        .del();
    return res.send(image);
}));
exports.default = exports.router;
