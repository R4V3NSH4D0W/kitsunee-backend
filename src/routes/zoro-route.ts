import express from 'express';
import { ZoroAnimeInfo, ZoroEpisodeSource, ZoroPopularAnime, ZoroSearchAnime, ZoroTopAiring } from '../controllers/zoro-anime-controller';

const router=express.Router();

router.get("/search",ZoroSearchAnime);
router.get('/popularanime',ZoroPopularAnime);
router.get('/topairing',ZoroTopAiring);
// router.get('/recentmovies',gogoRecentMovies)
// router.get('/genrelist',gogoGenreList)
router.get('/episodesource',ZoroEpisodeSource)
// router.get('/episodeserver',gogoGetEpisodeServer)
router.get('/animeinfo',ZoroAnimeInfo)
export default router;