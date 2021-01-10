import { Request, Response } from "express";
import { GroupDoc, Group } from "../models/group";

const findById = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP GET /groups/${id}`);

  try {
    const group = await Group.findById(id);
    res.send(group);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const find = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /groups/`);
  // if (!("userId" in req.body)) {
  //   res.sendStatus(403);
  //   return;
  // }
  const userId = req.body.userId;

  try {
    let groups: GroupDoc[];
    if (userId) {
      const queryOptions = req.body.isOwner
        ? { owner: userId }
        : { users: { $in: [userId] } };
      groups = await Group.find(queryOptions);
    } else {
      groups = await Group.find();
    }
    res.send(groups);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP POST /groups/`);

  const group = new Group({
    name: req.body.name,
    owner: req.params.userId,
    members: [req.params.userId],
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
  const id = req?.params?.id;
  console.log(`HTTP PUT /groups/${id}`);

  const update: Partial<GroupDoc> = {};
  if ("name" in req.body) {
    update["name"] = req.body.name;
  }

  if ("owner" in req.body) {
    update["owner"] = req.body.password;
  }

  if ("members" in req.body) {
    update["members"] = req.body.members.split(",");
  }

  if (Object.keys(update).length === 0) {
    res.sendStatus(400);
    return;
  }

  const options = { new: true };

  try {
    const group = await Group.findByIdAndUpdate(id, update, options);
    res.status(200).send(group);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP DELETE /groups/${id}`);

  try {
    await Group.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const GroupsController = {
  findById,
  find,
  create,
  update,
  remove,
};
