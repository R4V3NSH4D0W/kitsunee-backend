import { IsNewsWorking, newsFeed, newsInfo } from "../service/anime-news"
import  {Request,Response} from 'express';

export const getIsNewsWorking = async(_req:Request, res:Response)=>{
    const result = await IsNewsWorking();
     res.status(200).json(result)
}

export const getNewsFeeds = async(_req:Request, res:Response)=>{
    const result = await newsFeed();
    res.status(200).json(result)
}

export const getNewsInfo = async(req:Request, res:Response)=>{
    const id = req.query.id as string;
    if(!id){
        res.status(400).json({error:"id is required"})
    }
    const result = await newsInfo(id);
    res.status(200).json(result)
}