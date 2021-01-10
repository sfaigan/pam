import { Router } from "express";
import { PeopleController } from "../controllers/people";

const router = Router();

router.get("/", (req, res) => PeopleController.find(req, res));
export default router;
