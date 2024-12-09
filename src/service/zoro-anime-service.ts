import { ANIME } from "@consumet/extensions";

const zoroanime = new ANIME.Zoro();

//http://localhost:3000/api/zoroanime/animeinfo?id=one-piece-100
export const getZoroAnimeInfo = async (id: string) => {
    return await zoroanime.fetchAnimeInfo(id);
}

export const getZoroEpisodeSource = async (episodeId: string) => {
    return zoroanime.fetchEpisodeSources(episodeId);
}

export const getZoroTopUpcoming =async ()=>{
    return await zoroanime.fetchTopUpcoming();
}

export const getZoroMostPopular = async (page?: number) => {
    return await zoroanime.fetchMostPopular(page);
}

export const getZoroRecentlyAdded = async (page?: number) => {
    return await zoroanime.fetchRecentlyAdded(page)
}

export const getZoroDubbedAnime = async (page?:number) => {
    return await zoroanime.fetchDubbedAnime();
}

export const getZoroRecentlyUpdated = async (page?:number) => {
    return await zoroanime.fetchRecentlyUpdated(page);
}

export const getZoroSearch = async (query:string) => {
    return await zoroanime.search(query)
}

//http://localhost:3000/api/zoroanime/schedule?date=2023-12-09
export const getZoroSchedule = async (date?:string) => {
    return await zoroanime.fetchSchedule(date);
}

export const getZoroTopAiring = async (page?:number) => { 
    return await zoroanime.fetchTopAiring(page);
}
//http://localhost:3000/api/zoroanime/spotlight
export const getZoroSpotlight = async () => {
    return await zoroanime.fetchSpotlight();
}
