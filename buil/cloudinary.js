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
const v2_1 = __importDefault(require("cloudinary/lib/v2"));
v2_1.default.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API}`,
    api_secret: `${process.env.CLOUDINARY_SECRET}`
});
const imgUpload = (file) => __awaiter(this, void 0, void 0, function* () {
    const result = yield v2_1.default.uploader
        .upload(file.path, (error, result) => {
        return result;
    })
        .catch((e) => console.error(e));
    const urls = {
        url: result.url,
        secureUrl: result.secure_url
    };
    return urls;
});
exports.default = imgUpload;
