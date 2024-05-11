import express from "express";
const router = express.Router();
import { register, login } from "../controllers/userController.js";
import { createReview } from "../controllers/reviewController.js";

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/reviews", createReview);

export default router;
