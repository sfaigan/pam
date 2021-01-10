import { Router } from "express";
import { GroupsController } from "../controllers/groups";

const router = Router({ mergeParams: true });

router.get("/:id", (req, res) => GroupsController.findById(req, res));
router.get("/", (req, res) => GroupsController.find(req, res));
router.post("/", (req, res) => GroupsController.create(req, res));
router.put("/:id", (req, res) => GroupsController.update(req, res));
router.delete("/:id", (req, res) => GroupsController.remove(req, res));

export default router;
