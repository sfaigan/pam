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

const join = async (req: Request, res: Response): Promise<void> => {
  const code = req?.params?.code;
  console.log(`HTTP PUT /groups/${code}`);

  try {
    let group = await Group.findOne({ code: code }).exec();
    const user_id = nanoid(6);

    group = await Group.findByIdAndUpdate(
      group.id,
      { $push: { users: user_id } },
      { new: true }
    );

    res.status(200).send({ user_id, group });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const rate = async (req: Request, res: Response): Promise<void> => {
  const code = req?.params?.code;
  console.log(`HTTP PUT /groups/${code}`);

  try {
    let group = await Group.findOne({ code: code }).exec();

    if (validateRating(group, req?.body?.userId)) {
      const rating = {
        userId: req?.body?.userId,
        movieId: req?.body?.movieId,
        like: req?.body?.like,
      };
      group = await Group.findByIdAndUpdate(
        group.id,
        { $push: { movies: rating } },
        { new: true }
      );
    }

    res.status(200).send(group);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const validateRating = (group: GroupDoc, userId: string): boolean => {
  return (userId && group.users?.includes(userId)) as boolean;
};

export const GroupsController = {
  findByCode,
  create,
  join,
  rate,
};
