import axios from "axios";
import { Genre } from "../types";

const URL = "https://api.themoviedb.org/3";

const findGenres = async (): Promise<Genre[]> => {
  const genres = await axios
    .get(
      `${URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    )
    .then((response) => response.data);
  return genres;
};

const findPeople = async (query: string, page = "1"): Promise<Genre[]> => {
  const genres = await axios
    .get(
      `${URL}/search/person?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${page}`
    )
    .then((response) => response.data);
  return genres;
};

const findMovies = async (query: string, page = "1"): Promise<Genre[]> => {
  const movies = await axios
    .get(
      `${URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=${page}`
    )
    .then((response) => response.data);
  return movies;
};

const discoverMovies = async (
  genres: string[],
  providers: string[],
  page = "1",
  region = "CA"
): Promise<Genre[]> => {
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
  findPeople,
  findMovies,
  discoverMovies,
};
