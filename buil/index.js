"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet = require("helmet");
const cors_1 = __importDefault(require("cors"));
const userController_1 = __importDefault(require("./controllers/userController"));
const imageController_1 = __importDefault(require("./controllers/imageController"));
const database_1 = require("./database/database");
database_1.initDb();
const app = express_1.default();
const port = process.env.PORT || 4000;
app.use(helmet());
app.use(cors_1.default({
    exposedHeaders: ['authorization']
}));
app.use(body_parser_1.default.json());
app.use(userController_1.default);
app.use(imageController_1.default);
app.get('/', (req, res) => {
    return res.status(200).json('hello');
});
app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
