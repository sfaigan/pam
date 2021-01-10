import { Request, Response } from "express";
import { UserDoc, User } from "../models/user";

const findById = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP GET /users/${id}`);

  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// TODO: Query parameters
const find = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /users/`);

  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP POST /users/`);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    age: req.body.age,
    subscribedTo: req.body.subscribedTo,
  });

  try {
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP PUT /users/${id}`);

  const update: Partial<UserDoc> = {};
  if ("email" in req.body) {
    update["email"] = req.body.email;
  }

  if ("password" in req.body) {
    update["password"] = req.body.password;
  }

  if ("name" in req.body) {
    update["name"] = req.body.name;
  }

  if ("age" in req.body) {
    update["age"] = req.body.age;
  }

  if ("subscribedTo" in req.body) {
    update["subscribedTo"] = req.body.subscribedTo;
  }

  if (Object.keys(update).length === 0) {
    res.sendStatus(400);
    return;
  }

  const options = { new: true };

  try {
    const user = await User.findByIdAndUpdate(id, update, options);
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP DELETE /users/${id}`);

  try {
    await User.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const UsersController = {
  findById,
  find,
  create,
  update,
  remove,
};
