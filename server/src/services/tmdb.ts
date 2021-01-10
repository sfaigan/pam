import axios from "axios";
import { Genre } from "../types";

const findGenres = async (): Promise<Genre[]> => {
  const genres = await axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    )
    .then((response) => response.data);
  return genres;
};

export const TmdbService = {
  findGenres,
};
