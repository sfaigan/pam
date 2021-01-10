import axios from "axios";
import { Genre, Movie } from "../types";

const URL = "https://api.themoviedb.org/3";

const findGenres = async (): Promise<Genre[]> => {
  const genres = await axios
    .get(
      `${URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    )
    .then((response) => response.data);
  return genres;
};

interface DiscoverMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const discoverMovies = async (
  genres: string[],
  providers: string[],
  page = "1",
  region = "CA"
): Promise<DiscoverMoviesResponse> => {
  const genreQuery = encodeURIComponent(genres.join("|"));
  const providersQuery = encodeURIComponent(providers.join("|"));
  const movies = await axios
    .get(
      `${URL}/discover/movie?api_key=1d76940c60fa52cb59e1d43586d5c949&language=en-US&sort_by=popularity.desc&with_genres=${genreQuery}&with_watch_providers=${providersQuery}&watch_region=${region}&page=${page}`
    )
    .then((response) => response.data);
  return movies;
};

export const TmdbService = {
  findGenres,
  discoverMovies,
};
