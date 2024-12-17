"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentEpisodes = exports.getEpisodeSource = exports.getEpisodeServer = exports.getPopularAnime = exports.getRecentMovie = exports.getSearchAnime = exports.isGogoWorking = exports.getTopAiring = exports.getGenreList = exports.getGenreInfo = exports.getAnimeInfo = void 0;
const extensions_1 = require("@consumet/extensions");
const gogoanime = new extensions_1.ANIME.Gogoanime();
const getSearchAnime = async (query) => {
    return await gogoanime.search(query);
};
exports.getSearchAnime = getSearchAnime;
const getAnimeInfo = async (id) => {
    return await gogoanime.fetchAnimeInfo(id);
};
exports.getAnimeInfo = getAnimeInfo;
const getPopularAnime = async (page) => {
    return await gogoanime.fetchPopular(page);
};
exports.getPopularAnime = getPopularAnime;
const getTopAiring = async (page) => {
    return await gogoanime.fetchTopAiring(page);
};
exports.getTopAiring = getTopAiring;
const getRecentEpisodes = async () => {
    return gogoanime.fetchRecentEpisodes();
};
exports.getRecentEpisodes = getRecentEpisodes;
const getGenreList = async () => {
    return gogoanime.fetchGenreList();
};
exports.getGenreList = getGenreList;
const getGenreInfo = async (genre, page) => {
    return gogoanime.fetchGenreInfo(genre, page);
};
exports.getGenreInfo = getGenreInfo;
const getRecentMovie = async (page) => {
    return gogoanime.fetchRecentMovies(page);
};
exports.getRecentMovie = getRecentMovie;
const getEpisodeSource = async (episodeId) => {
    return gogoanime.fetchEpisodeServers(episodeId);
};
exports.getEpisodeSource = getEpisodeSource;
const getEpisodeServer = async (episodeId) => {
    return gogoanime.fetchEpisodeServers(episodeId);
};
exports.getEpisodeServer = getEpisodeServer;
const isGogoWorking = async () => {
    return gogoanime.isWorking;
};
exports.isGogoWorking = isGogoWorking;
