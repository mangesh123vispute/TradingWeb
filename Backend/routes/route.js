import express from "express";
const router = express.Router();
import { register, login } from "../controllers/userController.js";
import { createReview } from "../controllers/reviewController.js";
import { verifyJWT } from "../middelwares/auth.middleware.js";

router.route("/users/register").post(register);
router.route("/users/login").post(login);
router.route("/users/review").post(verifyJWT, createReview);

export default router;
