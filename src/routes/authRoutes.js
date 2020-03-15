import { Router } from "express";

import User from "../controllers/auth";

const router = Router();

router.post("/signup", User.registerUser);
router.post("/login", User.loginUser);

export default router;
