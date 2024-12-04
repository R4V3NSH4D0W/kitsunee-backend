import express from 'express';
import { GogoPopularAnime, GogoSearchAnime, GogoTopAiring } from '../controllers/gogo-anime-controller';

const router=express.Router();

router.get("/search",GogoSearchAnime);
router.get('/popularanime',GogoPopularAnime);
router.get('/topairing',GogoTopAiring);

export default router;