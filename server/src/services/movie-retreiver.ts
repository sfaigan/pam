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
  const first_response = await TmdbService.discoverMovies(
    genres,
    providers,
    "1",
    region
  );
  const total_pages = first_response.total_pages;

  let page = 2;
  const calls = [];
  while (page <= total_pages) {
    calls.push(tryMovies(genres, providers, "CA", page));
    page = page + 1;
  }
  const result = await Promise.all(calls);

  return first_response.results.concat(result.flat());
};
