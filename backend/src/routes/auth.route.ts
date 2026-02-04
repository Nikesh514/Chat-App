import { Register } from "../controllers/auth.controller"; // Correct relative path
import { Router } from "express";

const router = Router();

router.get("/register", Register);

export default router;