import { Router } from "express";
import { GenresController } from "../controllers/genres";

const router = Router();

router.get("/", (req, res) => GenresController.find(req, res));
export default router;
