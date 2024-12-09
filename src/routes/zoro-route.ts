import express from 'express';
import { ZoroAnimeInfo, ZoroEpisodeSource, ZoroPopularAnime, ZoroRecentlyAdded, ZoroRecentlyUpdated, ZoroSchedule, ZoroSearchAnime, ZoroSpotLight, ZoroTopAiring } from '../controllers/zoro-anime-controller';

const router=express.Router();

router.get("/search",ZoroSearchAnime);
router.get('/popularanime',ZoroPopularAnime);
router.get('/topairing',ZoroTopAiring);
router.get('/spotlight',ZoroSpotLight)
router.get('/recentlyupdated',ZoroRecentlyUpdated)
router.get('/episodesource',ZoroEpisodeSource)
router.get('/recentlyadded',ZoroRecentlyAdded)
router.get('/animeinfo',ZoroAnimeInfo)
router.get('/schedule',ZoroSchedule)
export default router;