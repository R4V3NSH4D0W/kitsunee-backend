import { Request, Response } from "express";
import { getPopularAnime, getSearchAnime, getTopAiring } from "../service/anime-service";

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