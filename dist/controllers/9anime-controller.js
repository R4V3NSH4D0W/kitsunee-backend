"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._9animeWorking = exports._9animeInfo = exports._9animeSearch = void 0;
const _9anime_service_1 = require("../service/9anime-service");
const _9animeSearch = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        res.status(400).json({ error: "Please provide search query" });
    }
    try {
        const searchResult = await (0, _9anime_service_1.search9anime)(query);
        res.status(200).json(searchResult);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports._9animeSearch = _9animeSearch;
const _9animeInfo = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ error: "Please provide anime id" });
    }
    try {
        const animeInfo = await (0, _9anime_service_1.get9AnimeInfo)(id);
        res.status(200).json(animeInfo);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports._9animeInfo = _9animeInfo;
const _9animeWorking = async (_req, res) => {
    const result = await (0, _9anime_service_1.is9AnimeWorking)();
    res.status(200).json(result);
};
exports._9animeWorking = _9animeWorking;
