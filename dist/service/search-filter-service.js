"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFilteredData = void 0;
const extensions_1 = require("@consumet/extensions");
const zoroanime = new extensions_1.ANIME.Zoro();
const gogoanime = new extensions_1.ANIME.Gogoanime();
// Main function
const fetchFilteredData = async ({ genres, sortBy, filterStatus, filterType }) => {
    console.log("Input options:", { genres, sortBy, filterStatus, filterType });
    let results = [];
    if (sortBy) {
        switch (sortBy.toLowerCase()) {
            case 'popularity': //change to top
                const [zoroResults, gogoResults] = await Promise.all([
                    fetchZoroTopAiring(),
                    fetchGogoTopAiring()
                ]);
                const mergedResults = mergeAndNormalizeResults(zoroResults, gogoResults);
                console.log('Merged results:', mergedResults);
                // Apply filters
                // results = applyFilters(mergedResults, { genres, filterStatus, filterType });
                break;
            default:
                console.log("Sort option not implemented");
        }
    }
    console.log("Filtered Results:", results);
    return results;
};
exports.fetchFilteredData = fetchFilteredData;
// Fetch ZoroAnime popular data
const fetchZoroTopAiring = async () => {
    const results = [];
    try {
        for (let page = 1; page <= 2; page++) {
            const response = await zoroanime.fetchTopAiring(page);
            if (response?.results?.length) {
                response.results.forEach((anime) => {
                    results.push(normalizeAnimeData(anime, 'ZoroAnime'));
                });
            }
        }
    }
    catch (error) {
        console.error("Error fetching ZoroAnime data:", error);
    }
    return results;
};
// Fetch GogoAnime popular data
const fetchGogoTopAiring = async () => {
    const results = [];
    try {
        for (let page = 1; page <= 2; page++) {
            const response = await gogoanime.fetchTopAiring(page);
            if (response?.results?.length) {
                response.results.forEach((anime) => {
                    results.push(normalizeAnimeData(anime, 'GogoAnime'));
                });
            }
        }
    }
    catch (error) {
        console.error("Error fetching GogoAnime data:", error);
    }
    return results;
};
// Merge data logic with title comparison to avoid duplicates
const mergeAndNormalizeResults = (zoroResults, gogoResults) => {
    const map = new Map();
    // Populate ZoroAnime results
    zoroResults.forEach((anime) => {
        map.set(anime.title.toLowerCase(), anime);
    });
    // Merge with GogoAnime genres
    gogoResults.forEach((anime) => {
        const titleKey = anime.title.toLowerCase();
        if (map.has(titleKey)) {
            // Merge data: Push Gogo's genres into Zoro's results
            map.set(titleKey, { ...map.get(titleKey), genres: anime.genres });
        }
        else {
            map.set(titleKey, anime);
        }
    });
    return Array.from(map.values());
};
// Normalize raw anime data into a consistent format
const normalizeAnimeData = (anime, source) => {
    switch (source) {
        case 'ZoroAnime':
            return {
                title: anime.title || '',
                url: anime.url || '',
                image: anime.image || '',
                type: anime.type || 'Unknown',
                genres: [],
            };
        case 'GogoAnime':
            return {
                title: anime.title || '',
                url: anime.url || '',
                image: anime.image || '',
                type: 'TV',
                genres: anime.genres || [],
            };
        default:
            return {
                title: '',
                url: '',
                image: '',
                type: '',
                genres: [],
            };
    }
};
// const applyFilters = (results: Anime[], { genres, filterStatus, filterType }: FetchOptions): Anime[] => {
//   return results.filter((anime) => {
//     let matchesGenres = true;
//     let matchesStatus = true;
//     let matchesType = true;
//     if (genres?.length) {
//       matchesGenres = genres.some((genre) => anime.genres?.includes(genre));
//     }
//     if (filterType) {
//       matchesType = anime.type === filterType;
//     }
//     return matchesGenres && matchesStatus && matchesType;
//   });
// };
