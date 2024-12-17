"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZoroWorking = exports.getTopUpComing = exports.getZoroMovie = exports.getZoroMostFavorite = exports.getZoroSearchByGenre = exports.getZoroGenres = exports.getZoroSearchSuggestions = exports.getZoroSpotlight = exports.getZoroTopAiring = exports.getZoroSchedule = exports.getZoroSearch = exports.getZoroRecentlyUpdated = exports.getZoroDubbedAnime = exports.getZoroRecentlyAdded = exports.getZoroMostPopular = exports.getZoroTopUpcoming = exports.getZoroEpisodeSource = exports.getZoroAnimeInfo = void 0;
const extensions_1 = require("@consumet/extensions");
const zoroanime = new extensions_1.ANIME.Zoro();
//http://localhost:3000/api/zoroanime/animeinfo?id=one-piece-100
const getZoroAnimeInfo = async (id) => {
    return await zoroanime.fetchAnimeInfo(id);
};
exports.getZoroAnimeInfo = getZoroAnimeInfo;
const getZoroEpisodeSource = async (episodeId) => {
    return zoroanime.fetchEpisodeSources(episodeId);
};
exports.getZoroEpisodeSource = getZoroEpisodeSource;
const getZoroTopUpcoming = async () => {
    return await zoroanime.fetchTopUpcoming();
};
exports.getZoroTopUpcoming = getZoroTopUpcoming;
const getZoroMostPopular = async (page) => {
    return await zoroanime.fetchMostPopular(page);
};
exports.getZoroMostPopular = getZoroMostPopular;
const getZoroRecentlyAdded = async (page) => {
    return await zoroanime.fetchRecentlyAdded(page);
};
exports.getZoroRecentlyAdded = getZoroRecentlyAdded;
const getZoroDubbedAnime = async (page) => {
    return await zoroanime.fetchDubbedAnime();
};
exports.getZoroDubbedAnime = getZoroDubbedAnime;
const getZoroRecentlyUpdated = async (page) => {
    return await zoroanime.fetchRecentlyUpdated(page);
};
exports.getZoroRecentlyUpdated = getZoroRecentlyUpdated;
//http://localhost:3000/api/zoroanime/search?q=sword
const getZoroSearch = async (query) => {
    return await zoroanime.search(query);
};
exports.getZoroSearch = getZoroSearch;
//http://localhost:3000/api/zoroanime/schedule?date=2023-12-09
const getZoroSchedule = async (date) => {
    return await zoroanime.fetchSchedule(date);
};
exports.getZoroSchedule = getZoroSchedule;
const getZoroTopAiring = async (page) => {
    return await zoroanime.fetchTopAiring(page);
};
exports.getZoroTopAiring = getZoroTopAiring;
//http://localhost:3000/api/zoroanime/spotlight
const getZoroSpotlight = async () => {
    return await zoroanime.fetchSpotlight();
};
exports.getZoroSpotlight = getZoroSpotlight;
const getZoroSearchSuggestions = async (query) => {
    return await zoroanime.fetchSearchSuggestions(query);
};
exports.getZoroSearchSuggestions = getZoroSearchSuggestions;
const getZoroGenres = async () => {
    return await zoroanime.fetchGenres();
};
exports.getZoroGenres = getZoroGenres;
//http://localhost:3000/api/zoroanime/searchbygenre?genre=action
const getZoroSearchByGenre = async (genre, page) => {
    return await zoroanime.genreSearch(genre, page);
};
exports.getZoroSearchByGenre = getZoroSearchByGenre;
const getZoroMostFavorite = async (page) => {
    return await zoroanime.fetchMostFavorite(page);
};
exports.getZoroMostFavorite = getZoroMostFavorite;
const getZoroMovie = async (page) => {
    return await zoroanime.fetchMovie(page);
};
exports.getZoroMovie = getZoroMovie;
const getTopUpComing = async (page) => {
    return await zoroanime.fetchTopUpcoming(page);
};
exports.getTopUpComing = getTopUpComing;
const isZoroWorking = async () => {
    return await zoroanime.isWorking;
};
exports.isZoroWorking = isZoroWorking;
