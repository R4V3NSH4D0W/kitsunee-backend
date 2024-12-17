"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedAnimeDetails = exports.ZoroMovie = exports.ZoroFilterSearch = exports.checkZoroWorking = exports.ZoroMostFavorite = exports.ZoroSearchByGenre = exports.ZoroGenre = exports.ZoroSchedule = exports.ZoroRecentlyUpdated = exports.ZoroAnimeInfo = exports.ZoroEpisodeSource = exports.ZoroSpotLight = exports.ZoroRecentlyAdded = exports.ZoroPopularAnime = exports.ZoroTopAiring = exports.ZoroSearchAnime = void 0;
const zoro_anime_service_1 = require("../service/zoro-anime-service");
const search_filter_service_1 = require("../service/search-filter-service");
const anime_info_mapper_1 = require("../service/anime-info-mapper");
const ZoroSearchAnime = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        res.status(400).json({ error: "Please provide a search query" });
        return;
    }
    try {
        const searchResult = await (0, zoro_anime_service_1.getZoroSearch)(query);
        res.status(200).json(searchResult);
    }
    catch (error) {
        console.error("Error in ZoroSearchAnime:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.ZoroSearchAnime = ZoroSearchAnime;
const ZoroTopAiring = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const topAiring = await (0, zoro_anime_service_1.getZoroTopAiring)(page);
        res.status(200).json(topAiring);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroTopAiring = ZoroTopAiring;
const ZoroPopularAnime = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const popularAnime = await (0, zoro_anime_service_1.getZoroMostPopular)(page);
        res.status(200).json(popularAnime);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroPopularAnime = ZoroPopularAnime;
const ZoroRecentlyAdded = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const recentlyadded = await (0, zoro_anime_service_1.getZoroRecentlyAdded)(page);
        res.status(200).json(recentlyadded);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroRecentlyAdded = ZoroRecentlyAdded;
const ZoroSpotLight = async (_req, res) => {
    try {
        const spotlight = await (0, zoro_anime_service_1.getZoroSpotlight)();
        res.status(200).json(spotlight);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroSpotLight = ZoroSpotLight;
const ZoroEpisodeSource = async (req, res) => {
    const episodeId = req.query.id;
    if (!episodeId) {
        res.status(400).json({ error: "Please provide episode id" });
    }
    try {
        const episodeSource = await (0, zoro_anime_service_1.getZoroEpisodeSource)(episodeId);
        res.status(200).json(episodeSource);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.ZoroEpisodeSource = ZoroEpisodeSource;
const ZoroAnimeInfo = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ error: "Please provide search query" });
    }
    try {
        const animeInfo = await (0, zoro_anime_service_1.getZoroAnimeInfo)(id);
        res.status(200).json(animeInfo);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroAnimeInfo = ZoroAnimeInfo;
const ZoroRecentlyUpdated = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const recentUpdated = await (0, zoro_anime_service_1.getZoroRecentlyUpdated)(page);
        res.status(200).json(recentUpdated);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroRecentlyUpdated = ZoroRecentlyUpdated;
const ZoroSchedule = async (req, res) => {
    const date = req.query.date;
    try {
        const schedule = await (0, zoro_anime_service_1.getZoroSchedule)(date);
        res.status(200).json(schedule);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroSchedule = ZoroSchedule;
const ZoroGenre = async (_req, res) => {
    try {
        const results = await (0, zoro_anime_service_1.getZoroGenres)();
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroGenre = ZoroGenre;
const ZoroSearchByGenre = async (req, res) => {
    const genre = req.query.genre;
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const results = await (0, zoro_anime_service_1.getZoroSearchByGenre)(genre, page);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroSearchByGenre = ZoroSearchByGenre;
const ZoroMostFavorite = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const result = await (0, zoro_anime_service_1.getZoroMostFavorite)(page);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroMostFavorite = ZoroMostFavorite;
const checkZoroWorking = async (_req, res) => {
    try {
        const isWorking = await (0, zoro_anime_service_1.isZoroWorking)();
        res.status(200).json({ isWorking });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.checkZoroWorking = checkZoroWorking;
const ZoroFilterSearch = async (req, res) => {
    const { genres = [], sort = 'popularity', status = 'all', type = 'tv' } = req.body;
    try {
        if (!Array.isArray(genres) || !genres.every(g => typeof g === 'string')) {
            res.status(400).json({
                success: false,
                message: 'Genres must be an array of strings',
            });
        }
        if (typeof sort !== 'string' || typeof status !== 'string' || typeof type !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Sort, status, and type must be strings',
            });
        }
        const filteredResults = await (0, search_filter_service_1.fetchFilteredData)({
            genres,
            sortBy: sort.toLowerCase(),
            filterStatus: status.toLowerCase(),
            filterType: type.toLowerCase(),
        });
        res.status(200).json({
            success: true,
            filters: { genres, sort, status, type },
            results: filteredResults,
        });
    }
    catch (error) {
        console.error('Filter Search Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroFilterSearch = ZoroFilterSearch;
const ZoroMovie = async (req, res) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page))
            ? Number(req.query.page)
            : 1;
        const result = await (0, zoro_anime_service_1.getZoroMovie)(page);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ZoroMovie = ZoroMovie;
const MappedAnimeDetails = async (req, res) => {
    const animeId = req.query.id;
    if (!animeId) {
        res.status(400).json({ error: "Please provide anime id" });
    }
    try {
        const animeDetails = await (0, anime_info_mapper_1.mapAnimeDetail)(animeId);
        res.status(200).json(animeDetails);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.MappedAnimeDetails = MappedAnimeDetails;
