import { ANIME } from "@consumet/extensions";

const _9anime= new ANIME.NineAnime();

export const get9AnimeInfo = async (id: string) => {
    return await _9anime.fetchAnimeInfo(id);
}

export const search9anime = async (query:string, page?:number) => {
    return _9anime.search(query,page);
}

export const is9AnimeWorking =async()=>{
    return _9anime.isWorking;
}