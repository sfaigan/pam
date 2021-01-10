import { Request, Response } from "express";
import { TmdbService } from "../services/tmdb";

const discover = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /movies/discover`);
  try {
    const genres = req?.query?.genres as string[];
    const providers = req?.query?.providers as string[];
    const page = req?.query?.page as string;
    const region = req?.query?.region as string;
    const movies = await TmdbService.discoverMovies(
      genres,
      providers,
      page,
      region
    );
    res.send(movies);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const MoviesController = {
  discover,
};
