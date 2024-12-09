import { Request, Response } from "express";
import { getZoroAnimeInfo, getZoroEpisodeSource, getZoroMostPopular, getZoroRecentlyAdded, getZoroRecentlyUpdated, getZoroSchedule, getZoroSearch, getZoroSpotlight, getZoroTopAiring } from "../service/zoro-anime-service";


export const ZoroSearchAnime=async(req:Request, res:Response):Promise<void>=>{
    const query = req.query.q as string;
   if(!query){
    res.status(400).json({error:"Please provide search query"})
   }
   try{
    const searchResult= await getZoroSearch(query);
    res.status(200).json(searchResult);
   }catch(error){
    res.status(500).json({error:"Internal Server Error"});
   }
}

export const ZoroTopAiring = async (req: Request, res: Response) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const topAiring = await getZoroTopAiring(page);

        res.status(200).json(topAiring);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const ZoroPopularAnime = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const popularAnime= await getZoroMostPopular(page);
        res.status(200).json(popularAnime);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const ZoroRecentlyAdded = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const recentlyadded= await getZoroRecentlyAdded(page);
        res.status(200).json(recentlyadded);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const ZoroSpotLight = async(_req:Request, res:Response)=>{
    try{
      
        const spotlight= await getZoroSpotlight();
        res.status(200).json(spotlight);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const ZoroEpisodeSource =async(req:Request, res:Response)=>{
    const episodeId= req.query.id as string;
    if(!episodeId){
         res.status(400).json({error:"Please provide episode id"});
    }
    try{
        const episodeSource = await getZoroEpisodeSource(episodeId);
         res.status(200).json(episodeSource);
    }catch(error){
         res.status(500).json({error:"Internal Server Error"});
    }
}

export const ZoroAnimeInfo = async(req:Request, res:Response)=>{
    const id = req.query.id as string;
    if(!id){
     res.status(400).json({error:"Please provide search query"})
    }
    try{
        const animeInfo= await getZoroAnimeInfo(id);
        res.status(200).json(animeInfo);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}


export const ZoroRecentlyUpdated = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const recentUpdated= await getZoroRecentlyUpdated(page);
        res.status(200).json(recentUpdated);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const ZoroSchedule = async(req:Request, res:Response)=>{
    const date = req.query.date as string;
    try{
        const schedule= await getZoroSchedule(date);
        res.status(200).json(schedule);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}