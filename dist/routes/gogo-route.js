"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gogo_anime_controller_1 = require("../controllers/gogo-anime-controller");
const router = express_1.default.Router();
router.get("/search", gogo_anime_controller_1.GogoSearchAnime);
router.get('/popularanime', gogo_anime_controller_1.GogoPopularAnime);
router.get('/topairing', gogo_anime_controller_1.GogoTopAiring);
router.get('/recentmovies', gogo_anime_controller_1.gogoRecentMovies);
router.get('/genrelist', gogo_anime_controller_1.gogoGenreList);
router.get('/episodesource', gogo_anime_controller_1.gogoEpisodeSource);
router.get('/episodeserver', gogo_anime_controller_1.gogoGetEpisodeServer);
router.get('/animeinfo', gogo_anime_controller_1.gogoAnimeInfo);
router.get('/isworking', gogo_anime_controller_1.GogoWorking);
exports.default = router;
