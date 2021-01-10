import { TmdbService } from "./tmdb";
import { Movie } from "../types";

const tryMovies = async (
  genres: string[],
  providers: string[],
  region = "CA",
  page = 1
): Promise<Movie[]> => {
  try {
    const response = await TmdbService.discoverMovies(
      genres,
      providers,
      page.toString(),
      region
    );
    console.log(response.results[0].id);

    return response.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const retreiveMovies = async (
  genres: string[],
  providers: string[],
  region = "CA"
): Promise<Movie[]> => {
  const response = await TmdbService.discoverMovies(
    genres,
    providers,
    "1",
    region
  );
  const total_pages = response.total_pages;
  const movies = response.results;

  let page = 2;
  while (page <= total_pages) {
    movies.push(...(await tryMovies(genres, providers, "CA", page)));
    page = page + 1;
  }

  return movies;
};
