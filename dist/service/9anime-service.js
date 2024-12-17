"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is9AnimeWorking = exports.search9anime = exports.get9AnimeInfo = void 0;
const extensions_1 = require("@consumet/extensions");
const _9anime = new extensions_1.ANIME.NineAnime();
const get9AnimeInfo = async (id) => {
    return await _9anime.fetchAnimeInfo(id);
};
exports.get9AnimeInfo = get9AnimeInfo;
const search9anime = async (query, page) => {
    return _9anime.search(query, page);
};
exports.search9anime = search9anime;
const is9AnimeWorking = async () => {
    return _9anime.isWorking;
};
exports.is9AnimeWorking = is9AnimeWorking;
