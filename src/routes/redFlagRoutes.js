import { Router } from "express";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import redFlag from "../controllers/redflagContrals";

const router = Router();

router.get("/", auth, redFlag.fetchAllRedflags);
router.post("/", auth, redFlag.createRedflag);
router.get("/:id", auth, redFlag.fetchSpecificRedflag);
router.delete("/:id", auth, redFlag.deleteSpecificRedflag);
router.patch("/:id/comment", auth, redFlag.updateRedflagComment);
router.patch("/:id/location", auth, redFlag.updateRedflagLocation);
router.patch("/:id/status", [auth, admin], redFlag.updateRedflagStatus);

export default router;
