import express from 'express';
import { checkZoroWorking, MappedAnimeDetails, ZoroAnimeInfo, ZoroEpisodeSource, ZoroFilterSearch, ZoroGenre, ZoroMostFavorite, ZoroMovie, ZoroPopularAnime, ZoroRecentlyAdded, ZoroRecentlyUpdated, ZoroSchedule, ZoroSearchAnime, ZoroSearchByGenre, ZoroSpotLight, ZoroTopAiring } from '../controllers/zoro-anime-controller';

const router=express.Router();

/**
 * @swagger
 * /api/zoroanime/search:
 *   get:
 *     summary: Search for anime
 *     description: Search for anime using keyword
 *     responses:
 *       200:
 *         description: Successfully fetched search results
 */
router.get("/search",ZoroSearchAnime);
router.get('/popularanime',ZoroPopularAnime);
/**
 * @swagger
 * /api/zoroanime/topairing:
 *   get:
 *     summary: Fetch the top airing anime from ZoroAnime
 *     description: List anime currently being aired
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/topairing',ZoroTopAiring);
router.get('/spotlight',ZoroSpotLight);
router.get('/mostfavorite',ZoroMostFavorite);
router.get('/recentlyupdated',ZoroRecentlyUpdated);
router.get('/episodesource',ZoroEpisodeSource);
router.get('/recentlyadded',ZoroRecentlyAdded);
router.get('/animeinfo',ZoroAnimeInfo);
router.get('/schedule',ZoroSchedule);
router.get('/genres',ZoroGenre);
router.get('/searchbygenre',ZoroSearchByGenre);
router.post('/filtersearch', ZoroFilterSearch);
router.get('/iszoroworking',checkZoroWorking);
router.get('/movie',ZoroMovie);
router.get('/mappedanimeinfo',MappedAnimeDetails)
export default router;