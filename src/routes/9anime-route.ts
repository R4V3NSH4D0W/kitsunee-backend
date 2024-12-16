import express from 'express';
import { _9animeInfo, _9animeSearch, _9animeWorking } from '../controllers/9anime-controller';


const router=express.Router();

router.get("/search",_9animeSearch);
router.get('/info',_9animeInfo);
router.get('/isworking',_9animeWorking)

export default router;