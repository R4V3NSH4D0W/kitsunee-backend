import { getZoroAnimeInfo } from "./zoro-anime-service";
import { getAnimeInfo } from "./anime-service";


function trimAfterLastNumberedSuffix(input: string): string {
  return input.replace(/-\d+$/, '');
}


export const mapAnimeDetail = async (animeId: string) => {
  try {

    const [zoroResult, gogoResult] = await Promise.all([
      getZoroAnimeInfo(animeId), 
      getAnimeInfo(trimAfterLastNumberedSuffix(animeId)), 
    ]);

    const { episodes, genres, releaseDate, type, status, otherName } = gogoResult;

    const combinedResult = {
      ...zoroResult,
      genres,
      releaseDate,
      type,
      status,
      otherName,
      gogoEpisodes: episodes,
    };

    return combinedResult;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error;
  }
};
