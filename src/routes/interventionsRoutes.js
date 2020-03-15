import { Router } from "express";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import intervention from "../controllers/interventionContrals";

const router = Router();

router.get("/", auth, intervention.fetchAllInterventions);
router.post("/", auth, intervention.createAnIntervention);
router.get("/:id", auth, intervention.fetchSpecificIntervention);
router.delete("/:id", auth, intervention.deleteSpecificIntervention);
router.patch("/:id/comment", auth, intervention.updateInterventionComment);
router.patch("/:id/location", auth, intervention.updateInterventionLocation);
router.patch(
  "/:id/status",
  [auth, admin],
  intervention.updateInterventionStatus
);

export default router;
