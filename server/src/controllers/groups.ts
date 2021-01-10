import { Request, Response } from "express";
import { GroupDoc, Group } from "../models/group";
import { nanoid } from "nanoid";

const findByCode = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(`HTTP GET /groups/:code`);
    const group = await Group.findOne({ code: req?.params?.code }).exec();
    res.send(group);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP POST /groups/`);

  const group = new Group({
    code: nanoid(6),
    movies: {},
    genres: req.body.genres,
    region: req.body.region,
    providers: req.body.providers,
  });

  try {
    const result = await group.save();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const code = req?.params?.code;
  console.log(`HTTP PUT /groups/${code}`);

  try {
    let group = await Group.findOne({ code: code }).exec();
    if (req?.body?.movie) {
      if (group.movies.get(req?.body?.movie?.toString())) {
        const count = group.movies.get(req?.body?.movie.toString()) + 1;
        group.movies.set(req?.body?.movie?.toString(), count);
      } else {
        group.movies.set(req?.body?.movie?.toString(), 1);
      }
    }

    group = await Group.findByIdAndUpdate(
      group.id,
      { movies: group.movies },
      { new: true }
    );
    res.status(200).send(group);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const GroupsController = {
  findByCode,
  create,
  update,
};
