import { Request, Response } from "express";
import { TmdbService } from "../services/tmdb";

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

export const MoviesController = {
  find,
};
