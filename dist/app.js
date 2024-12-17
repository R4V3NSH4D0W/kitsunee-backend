"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gogo_route_1 = __importDefault(require("./routes/gogo-route"));
const zoro_route_1 = __importDefault(require("./routes/zoro-route"));
const _9anime_route_1 = __importDefault(require("./routes/9anime-route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/gogoanime', gogo_route_1.default);
app.use('/api/zoroanime', zoro_route_1.default);
app.use('/api/9anime', _9anime_route_1.default);
exports.default = app;
