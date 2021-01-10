import { Request, Response } from "express";
import { TmdbService } from "../services/tmdb";
import { retreiveMovies } from "../services/movie-retreiver";

const find = async (req: Request, res: Response): Promise<void> => {
  const query = req?.query?.query?.toString() ?? "";
  const page = req?.query?.page?.toString() ?? "1";

  console.log(`HTTP GET /movies`);

  try {
    const movies = await TmdbService.findMovies(query, page);
    res.send(movies);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const discover = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /movies/discover`);
  try {
    const genres = req?.query?.genres as string[];
    const providers = req?.query?.providers as string[];
    const movies = await retreiveMovies(genres, providers);
    res.send(movies);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const MoviesController = {
  find,
  discover,
};
