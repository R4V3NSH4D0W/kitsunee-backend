import { Request, Response } from "express";
import { getZoroAnimeInfo, getZoroEpisodeSource, getZoroGenres, getZoroMostFavorite, getZoroMostPopular, getZoroMovie, getZoroRecentlyAdded, getZoroRecentlyUpdated, getZoroSchedule, getZoroSearch, getZoroSearchByGenre, getZoroSpotlight, getZoroTopAiring, isZoroWorking } from "../service/zoro-anime-service";
import { fetchFilteredData } from "../service/search-filter-service";
import { mapAnimeDetail } from "../service/anime-info-mapper";


export const ZoroSearchAnime = async (req: Request, res: Response): Promise<void> => {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    
    if (!query) {
      res.status(400).json({ error: "Please provide a search query" });
      return;
    }
  
    try {
      const searchResult = await getZoroSearch(query, page);
      if (!searchResult || searchResult.results.length === 0) {
        res.status(404).json({ error: "No Anime Found" });
        return;
      }
      res.status(200).json(searchResult);
    } catch (error) {
      console.error("Error in ZoroSearchAnime:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

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

export const ZoroEpisodeSource = async (req: Request, res: Response): Promise<void> => {
    const episodeId = req.query.id as string;

    if (!episodeId) {
        res.status(400).json({ error: "Please provide a valid episode id" });
        return; 
    }

    try {

        const episodeSource = await getZoroEpisodeSource(episodeId);
        
    
        if (!episodeSource) {
            res.status(404).json({ error: "Episode source not found" });
            return;
        }
        res.status(200).json(episodeSource);

    } catch (error) {
        console.error("Error fetching episode source:", error);

        if (error instanceof TypeError && error.message.includes("startsWith")) {
            res.status(500).json({ error: "Invalid data received from the source" });
            return; 
        }
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};




export const ZoroAnimeInfo = async(req:Request, res:Response)=>{
    const id = req.query.id as string;
    if(!id){
     res.status(400).json({error:"Please provide ID"})
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

export const ZoroGenre = async(_req:Request, res:Response)=>{
    try{
        const results= await getZoroGenres();
        res.status(200).json(results);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const ZoroSearchByGenre = async(req:Request, res:Response): Promise<void>=>{
    const genre = req.query.genre as string;
    console.log(genre);
    if (!genre) {
         res.status(400).json({ error: 'Genre query is required' });
      }
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const results= await getZoroSearchByGenre(genre,page);
     
        res.status(200).json(results);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}


export const ZoroMostFavorite = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const result= await getZoroMostFavorite(page);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}


export const checkZoroWorking = async (_req: Request, res: Response): Promise<void> => {
    try {
      const isWorking = await isZoroWorking();
      res.status(200).json({ isWorking });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


export const ZoroFilterSearch = async (req: Request, res: Response): Promise<void> => {
    const { genres = [], sort = 'popularity', status = 'all', type = 'tv' } = req.body;
  
    try {
      if (!Array.isArray(genres) || !genres.every(g => typeof g === 'string')) {
         res.status(400).json({
          success: false,
          message: 'Genres must be an array of strings',
        });
      }
  
      if (typeof sort !== 'string' || typeof status !== 'string' || typeof type !== 'string') {
         res.status(400).json({
          success: false,
          message: 'Sort, status, and type must be strings',
        });
      }

      const filteredResults = await fetchFilteredData({
        genres,
        sortBy: sort.toLowerCase(),
        filterStatus: status.toLowerCase(),
        filterType: type.toLowerCase(),
      });
  
      res.status(200).json({
        success: true,
        filters: { genres, sort, status, type },
        results: filteredResults,
      });
    } catch (error) {
      console.error('Filter Search Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


export const ZoroMovie = async(req:Request, res:Response)=>{
    try{
        const page = req.query.page && !isNaN(Number(req.query.page)) 
        ? Number(req.query.page) 
        : 1;
        const result= await getZoroMovie(page);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
}

export const MappedAnimeDetails = async(req:Request, res:Response)=>{
    const animeId = req.query.id as string;
    if(!animeId){
        res.status(400).json({error:"Please provide anime id"});
    }
    try{
        const animeDetails= await mapAnimeDetail(animeId);
        res.status(200).json(animeDetails);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
}
  

