import { Request, Response } from "express";
import { TmdbService } from "../services/tmdb";

const find = async (req: Request, res: Response): Promise<void> => {
  const query = req?.query?.query?.toString() ?? "";
  const page = req?.query?.page?.toString() ?? "1";

  console.log(`HTTP GET /people`);

  try {
    const people = await TmdbService.findPeople(query, page);
    res.send(people);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const PeopleController = {
  find,
};
