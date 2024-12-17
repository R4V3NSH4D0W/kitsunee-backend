"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAnimeDetail = void 0;
const zoro_anime_service_1 = require("./zoro-anime-service");
const anime_service_1 = require("./anime-service");
function trimAfterLastNumberedSuffix(input) {
    return input.replace(/-\d+$/, '');
}
//This wont work
const mapAnimeDetail = async (animeId) => {
    try {
        const [zoroResult, gogoResult] = await Promise.all([
            (0, zoro_anime_service_1.getZoroAnimeInfo)(animeId),
            (0, anime_service_1.getAnimeInfo)(trimAfterLastNumberedSuffix(animeId)),
        ]);
        const combinedResult = {
            ...zoroResult,
            genres: gogoResult?.genres || [],
            releaseDate: gogoResult?.releaseDate || "Unknown",
            type: gogoResult?.type || "Unknown",
            status: gogoResult?.status || "Unknown",
            otherName: gogoResult?.otherName || "None",
            gogoEpisodes: gogoResult?.episodes || [],
        };
        return combinedResult;
    }
    catch (error) {
        console.error("Error fetching anime details:", error);
        throw error;
    }
};
exports.mapAnimeDetail = mapAnimeDetail;
