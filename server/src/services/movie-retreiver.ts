import { TmdbService } from "./tmdb";
import { Movie } from "../types";


export const retreiveMovies = async (
  genres: string[],
  providers: string[],
  region = "CA"
): Promise<Movie[]> => {
  let page = 1;
  let total_pages = 1;
  const movies = [];
  // Optimize later
  while (page <= total_pages) {
    try {
      const response = await TmdbService.discoverMovies(
        genres,
        providers,
        page.toString(),
        region
      );
      total_pages = response.total_pages;
      movies.push(...response.results);
      page = page + 1;
    } catch (error) {
      console.log(error);
    }
  }

  return movies;
};
