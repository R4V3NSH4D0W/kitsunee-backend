import { ANIME } from "@consumet/extensions";

const gogoanime= new ANIME.Gogoanime();

const getSearchAnime =async(query:string)=>{
    return await gogoanime.search(query);
}

const getAnimeInfo = async(id:string)=>{
    return await gogoanime.fetchAnimeInfo(id);
}

const getPopularAnime = async(page?:number)=>{
    return await gogoanime.fetchPopular(page);
}

const getTopAiring = async(page?:number)=>{
    return await gogoanime.fetchTopAiring(page);
}
const getRecentEpisodes = async()=>{
    return gogoanime.fetchRecentEpisodes();
}

const getGenreList = async()=>{
    return gogoanime.fetchGenreList();
}

const getGenreInfo = async(genre:string, page?:number)=>{
    return gogoanime.fetchGenreInfo(genre,page);
}

const getRecentMovie =async(page?:number)=>{
    return gogoanime.fetchRecentMovies(page);
}

const getEpisodeSource =async(episodeId:string)=>{
    return gogoanime.fetchEpisodeServers(episodeId);
}
const getEpisodeServer = async(episodeId:string)=>{
    return gogoanime.fetchEpisodeServers(episodeId);
}

export {
    getAnimeInfo,
    getGenreInfo,
    getGenreList,
    getTopAiring,
    getSearchAnime,
    getRecentMovie,
    getPopularAnime,
    getEpisodeServer,
    getEpisodeSource,
    getRecentEpisodes,
}