import { Request, Response } from "express";
import { get9AnimeInfo, is9AnimeWorking, search9anime } from "../service/9anime-service";

export const _9animeSearch=async(req:Request, res:Response):Promise<void>=>{
    const query = req.query.q as string;
   if(!query){
    res.status(400).json({error:"Please provide search query"})
   }
   try{
    const searchResult= await search9anime(query);
    res.status(200).json(searchResult);
   }catch(error){
    res.status(500).json({error:"Internal Server Error"});
   }
}

export const _9animeInfo=async(req:Request, res:Response):Promise<void>=>{
    const id = req.query.id as string;
    if(!id){
        res.status(400).json({error:"Please provide anime id"})
    }
    try{
        const animeInfo= await get9AnimeInfo(id);
        res.status(200).json(animeInfo);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const _9animeWorking =async(_req:Request, res:Response)=>{
    const result= await is9AnimeWorking();
    res.status(200).json(result)
}