import { Router } from "express";
import { GroupsController } from "../controllers/groups";

const router = Router({ mergeParams: true });

router.get("/:code", (req, res) => GroupsController.findByCode(req, res));
router.post("/", (req, res) => GroupsController.create(req, res));
router.put("/:code/rate", (req, res) => GroupsController.rate(req, res));
router.put("/:code/join", (req, res) => GroupsController.join(req, res));

export default router;
