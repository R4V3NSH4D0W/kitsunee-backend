"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _9anime_controller_1 = require("../controllers/9anime-controller");
const router = express_1.default.Router();
router.get("/search", _9anime_controller_1._9animeSearch);
router.get('/info', _9anime_controller_1._9animeInfo);
router.get('/isworking', _9anime_controller_1._9animeWorking);
exports.default = router;
