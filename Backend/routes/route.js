import express from "express";
const router = express.Router();
import { createUser } from "../controllers/userController.js";
import { createReview } from "../controllers/reviewController.js";

router.post("/users", createUser);
router.post("/reviews", createReview);

export default router;
