import express from 'express';
import { gogoAnimeInfo, gogoEpisodeSource, gogoGenreList, gogoGetEpisodeServer, GogoPopularAnime, gogoRecentMovies, GogoSearchAnime, GogoTopAiring } from '../controllers/gogo-anime-controller';

const router=express.Router();

router.get("/search",GogoSearchAnime);
router.get('/popularanime',GogoPopularAnime);
router.get('/topairing',GogoTopAiring);
router.get('/recentmovies',gogoRecentMovies)
router.get('/genrelist',gogoGenreList)
router.get('/episodesource',gogoEpisodeSource)
router.get('/episodeserver',gogoGetEpisodeServer)
router.get('/animeinfo',gogoAnimeInfo)
export default router;