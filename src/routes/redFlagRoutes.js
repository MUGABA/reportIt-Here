import { Router } from "express";
import redFlag from "../controllers/redflagContrals";

const router = Router();

router.get("/", redFlag.fetchAllRedflags);
router.post("/", redFlag.createRedflag);
router.get("/:id", redFlag.fetchSpecificRedflag);
router.delete("/:id", redFlag.deleteSpecificRedflag);

export default router;
