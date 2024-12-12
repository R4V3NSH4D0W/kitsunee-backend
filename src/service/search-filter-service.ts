import { ANIME } from "@consumet/extensions";

const zoroanime = new ANIME.Zoro();
const gogoanime = new ANIME.Gogoanime();

interface FetchOptions {
  genres?: string[];
  sortBy?: string;
  filterStatus?: string;
  filterType?: string;
}

interface Anime {
  title: string;
  url: string;
  image: string;
  type: string;
  genres: string[];
}

interface FetchResponse {
  results: any[];
}

// Main function
export const fetchFilteredData = async ({ genres, sortBy, filterStatus, filterType }: FetchOptions): Promise<Anime[]> => {
  console.log("Input options:", { genres, sortBy, filterStatus, filterType });

  let results: Anime[] = [];
  
  if (sortBy) {
    switch (sortBy.toLowerCase()) {
      case 'popularity': //change to top
        const [zoroResults, gogoResults] = await Promise.all([
          fetchZoroTopAiring(),
          fetchGogoTopAiring()
        ]);

        const mergedResults = mergeAndNormalizeResults(zoroResults, gogoResults);
        console.log('Merged results:', mergedResults);

        // Apply filters
        // results = applyFilters(mergedResults, { genres, filterStatus, filterType });
        break;

      default:
        console.log("Sort option not implemented");
    }
  }

  console.log("Filtered Results:", results);

  return results;
};

// Fetch ZoroAnime popular data
const fetchZoroTopAiring = async (): Promise<Anime[]> => {
  const results: Anime[] = [];
  try {
    for (let page = 1; page <= 2; page++) {
      const response: FetchResponse = await zoroanime.fetchTopAiring(page);
      if (response?.results?.length) {
        response.results.forEach((anime) => {
          results.push(normalizeAnimeData(anime, 'ZoroAnime'));
        });
      }
    }
  } catch (error) {
    console.error("Error fetching ZoroAnime data:", error);
  }
  return results;
};

// Fetch GogoAnime popular data
const fetchGogoTopAiring = async (): Promise<Anime[]> => {
  const results: Anime[] = [];
  try {
    for (let page = 1; page <= 2; page++) {
      const response: FetchResponse = await gogoanime.fetchTopAiring(page);
      if (response?.results?.length) {
        response.results.forEach((anime) => {
          results.push(normalizeAnimeData(anime, 'GogoAnime'));
        });
      }
    }
  } catch (error) {
    console.error("Error fetching GogoAnime data:", error);
  }
  return results;
};

// Merge data logic with title comparison to avoid duplicates
const mergeAndNormalizeResults = (zoroResults: Anime[], gogoResults: Anime[]): Anime[] => {
  const map = new Map<string, Anime>();

  // Populate ZoroAnime results
  zoroResults.forEach((anime) => {
    map.set(anime.title.toLowerCase(), anime);
  });

  // Merge with GogoAnime genres
  gogoResults.forEach((anime) => {
    const titleKey = anime.title.toLowerCase();
    if (map.has(titleKey)) {
      // Merge data: Push Gogo's genres into Zoro's results
      map.set(titleKey, { ...map.get(titleKey)!, genres: anime.genres });
    } else {
      map.set(titleKey, anime);
    }
  });

  return Array.from(map.values());
};

// Normalize raw anime data into a consistent format
const normalizeAnimeData = (anime: any, source: 'ZoroAnime' | 'GogoAnime'): Anime => {
  switch (source) {
    case 'ZoroAnime':
      return {
        title: anime.title || '',
        url: anime.url || '',
        image: anime.image || '',
        type: anime.type || 'Unknown',
        genres: [],
      };
    case 'GogoAnime':
      return {
        title: anime.title || '',
        url: anime.url || '',
        image: anime.image || '',
        type: 'TV',
        genres: anime.genres || [],
      };
    default:
      return {
        title: '',
        url: '',
        image: '',
        type: '',
        genres: [],
      };
  }
};

// const applyFilters = (results: Anime[], { genres, filterStatus, filterType }: FetchOptions): Anime[] => {
//   return results.filter((anime) => {
//     let matchesGenres = true;
//     let matchesStatus = true;
//     let matchesType = true;

//     if (genres?.length) {
//       matchesGenres = genres.some((genre) => anime.genres?.includes(genre));
//     }

//     if (filterType) {
//       matchesType = anime.type === filterType;
//     }

//     return matchesGenres && matchesStatus && matchesType;
//   });
// };
