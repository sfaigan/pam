import { Router } from "express";
import { GroupsController } from "../controllers/groups";

const router = Router({ mergeParams: true });

router.get("/:code", (req, res) => GroupsController.findByCode(req, res));
router.post("/", (req, res) => GroupsController.create(req, res));
router.put("/:id", (req, res) => GroupsController.update(req, res));

export default router;
