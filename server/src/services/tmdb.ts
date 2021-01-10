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

export const TmdbService = {
  findGenres,
  findPeople,
};
