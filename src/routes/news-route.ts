import express from 'express';
import { getIsNewsWorking, getNewsFeeds, getNewsInfo } from '../controllers/news-controller';

const router=express.Router();
router.get('/isnewsworking',getIsNewsWorking);
router.get('/newsfeeds',getNewsFeeds);
//http://localhost:3000/api/news/newsinfo?id=2024-12-25/tying-the-knot-with-an-amagami-sister-anime-reveals-return-on-january-14-new-opening-song/.219488
router.get('/newsinfo',getNewsInfo);

export default router;