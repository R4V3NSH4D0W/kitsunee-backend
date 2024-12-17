import { getZoroAnimeInfo } from "./zoro-anime-service";
import { getAnimeInfo } from "./anime-service";

function trimAfterLastNumberedSuffix(input: string): string {
  return input.replace(/-\d+$/, '');
}

//This wont work
export const mapAnimeDetail = async (animeId: string) => {
  try {
    const [zoroResult, gogoResult] = await Promise.all([
      getZoroAnimeInfo(animeId),
      getAnimeInfo(trimAfterLastNumberedSuffix(animeId)),
    ]);

    const combinedResult = {
      ...zoroResult,
      genres: gogoResult?.genres || [],
      releaseDate: gogoResult?.releaseDate || "Unknown",
      type: gogoResult?.type || "Unknown",
      status: gogoResult?.status || "Unknown",
      otherName: gogoResult?.otherName || "None",
      gogoEpisodes: gogoResult?.episodes || [],
    };

    return combinedResult;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error;
  }
};
