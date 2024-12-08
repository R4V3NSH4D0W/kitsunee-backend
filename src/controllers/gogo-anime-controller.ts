import { Request, Response } from "express";
import { getAnimeInfo, getEpisodeServer, getEpisodeSource, getGenreList, getPopularAnime, getRecentMovie, getSearchAnime, getTopAiring } from "../service/anime-service";

export const GogoSearchAnime=async(req:Request, res:Response):Promise<void>=>{
    const query = req.query.q as string;
   if(!query){
    res.status(400).json({error:"Please provide search query"})
   }
   try{
    const searchResult= await getSearchAnime(query);
    res.status(200).json(searchResult);
   }catch(error){
    res.status(500).json({error:"Internal Server Error"});
   }
}

// http://localhost:3000/api/gogoanime/topairing?page=2
export const GogoTopAiring = async (req: Request, res: Response) => {
    try {
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const topAiring = await getTopAiring(page);

        res.status(200).json(topAiring);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const GogoPopularAnime = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const popularAnime= await getPopularAnime(page);
        res.status(200).json(popularAnime);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const gogoRecentMovies = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const recentMovie = await getRecentMovie(page);
         res.status(200).json(recentMovie);

    }catch(error){
         res.status(500).json({error:"Internal Server Error"});
    }
}

//http://localhost:3000/api/gogoanime/episodesource?id=dandadan-episode-1
export const gogoEpisodeSource =async(req:Request, res:Response)=>{
    const episodeId= req.query.id as string;
    if(!episodeId){
         res.status(400).json({error:"Please provide episode id"});
    }
    try{
        const episodeSource = await getEpisodeSource(episodeId);
         res.status(200).json(episodeSource);
    }catch(error){
         res.status(500).json({error:"Internal Server Error"});
    }
}

export const gogoGetEpisodeServer = async(req:Request, res:Response)=>{
    const episodeId= req.query.id as string;
    if(!episodeId){
         res.status(400).json({error:"Please provide episode id"});
    }
    try{
        const episodeServer = await getEpisodeServer(episodeId);
         res.status(200).json(episodeServer);
    }catch(error){
         res.status(500).json({error:"Internal Server Error"});
    }
}

export const gogoGenreList =async(req:Request, res:Response)=>{
    try{
        const genreList= await getGenreList();
        
         res.status(200).json(genreList);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

//http://localhost:3000/api/gogoanime/animeinfo?id=dandadan
export const gogoAnimeInfo = async(req:Request, res:Response)=>{
    const id = req.query.id as string;
    if(!id){
     res.status(400).json({error:"Please provide search query"})
    }
    try{
        const animeInfo= await getAnimeInfo(id);
        res.status(200).json(animeInfo);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}