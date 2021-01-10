import { Request, Response } from "express";
import { TmdbService } from "../services/tmdb";

const find = async (_req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /genres`);

  try {
    const genres = await TmdbService.findGenres();
    res.send(genres);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const GenresController = {
  find,
};
