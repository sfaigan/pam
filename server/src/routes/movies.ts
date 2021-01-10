import { Router } from "express";
import { MoviesController } from "../controllers/movies";

const router = Router();

router.get("/", (req, res) => MoviesController.find(req, res));
router.get("/discover", (req, res) => MoviesController.discover(req, res));
export default router;
