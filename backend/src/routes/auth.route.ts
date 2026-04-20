import { Register } from "../controllers/auth.controller"; // Correct relative path
import { Router } from "express";

const router = Router();

router.post("/register", Register);``

export default router;