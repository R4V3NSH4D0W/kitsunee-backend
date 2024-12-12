import { ANIME } from "@consumet/extensions";

const anfy= new ANIME.Anify();

export const getAnfySearchAnime =async(query:string)=>{
    return await anfy.search(query);
}

export const getAnfyAnimeInfo = async(id:string)=>{
    return await anfy.fetchAnimeInfo(id);
}

export const getAnfyEpisodeServer = async(episodeId:string,episodeNo:number ,id:number)=>{
    return anfy.fetchEpisodeSources(episodeId,episodeNo,id);
}
