import { Router } from "express";
import { UsersController } from "../controllers/users";

const router = Router();

router.get("/:id", (req, res) => UsersController.findById(req, res));
router.get("/", (req, res) => UsersController.find(req, res));
router.post("/", (req, res) => UsersController.create(req, res));
router.put("/:id", (req, res) => UsersController.update(req, res));
router.delete("/:id", (req, res) => UsersController.remove(req, res));

export default router;
