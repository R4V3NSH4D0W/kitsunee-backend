"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GogoWorking = exports.gogoAnimeInfo = exports.gogoGenreList = exports.gogoGetEpisodeServer = exports.gogoEpisodeSource = exports.gogoRecentMovies = exports.GogoPopularAnime = exports.GogoTopAiring = exports.GogoSearchAnime = void 0;
const anime_service_1 = require("../service/anime-service");
const GogoSearchAnime = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        res.status(400).json({ error: "Please provide search query" });
    }
    try {
        const searchResult = await (0, anime_service_1.getSearchAnime)(query);
        res.status(200).json(searchResult);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.GogoSearchAnime = GogoSearchAnime;
// http://localhost:3000/api/gogoanime/topairing?page=2
const GogoTopAiring = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const topAiring = await (0, anime_service_1.getTopAiring)(page);
        res.status(200).json(topAiring);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.GogoTopAiring = GogoTopAiring;
const GogoPopularAnime = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const popularAnime = await (0, anime_service_1.getPopularAnime)(page);
        res.status(200).json(popularAnime);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.GogoPopularAnime = GogoPopularAnime;
const gogoRecentMovies = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const recentMovie = await (0, anime_service_1.getRecentMovie)(page);
        res.status(200).json(recentMovie);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.gogoRecentMovies = gogoRecentMovies;
//http://localhost:3000/api/gogoanime/episodesource?id=dandadan-episode-1
const gogoEpisodeSource = async (req, res) => {
    const episodeId = req.query.id;
    if (!episodeId) {
        res.status(400).json({ error: "Please provide episode id" });
    }
    try {
        const episodeSource = await (0, anime_service_1.getEpisodeSource)(episodeId);
        res.status(200).json(episodeSource);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.gogoEpisodeSource = gogoEpisodeSource;
const gogoGetEpisodeServer = async (req, res) => {
    const episodeId = req.query.id;
    if (!episodeId) {
        res.status(400).json({ error: "Please provide episode id" });
    }
    try {
        const episodeServer = await (0, anime_service_1.getEpisodeServer)(episodeId);
        res.status(200).json(episodeServer);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.gogoGetEpisodeServer = gogoGetEpisodeServer;
const gogoGenreList = async (req, res) => {
    try {
        const genreList = await (0, anime_service_1.getGenreList)();
        res.status(200).json(genreList);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.gogoGenreList = gogoGenreList;
//http://localhost:3000/api/gogoanime/animeinfo?id=dandadan
const gogoAnimeInfo = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ error: "Please provide search query" });
    }
    try {
        const animeInfo = await (0, anime_service_1.getAnimeInfo)(id);
        res.status(200).json(animeInfo);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.gogoAnimeInfo = gogoAnimeInfo;
const GogoWorking = async (_req, res) => {
    const result = await (0, anime_service_1.isGogoWorking)();
    res.status(200).json(result);
};
exports.GogoWorking = GogoWorking;
