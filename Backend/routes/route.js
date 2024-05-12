import express from "express";
const router = express.Router();
import { register, login } from "../controllers/userController.js";
import {
  createReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { verifyJWT } from "../middelwares/auth.middleware.js";

//* Authentication
router.route("/users/register").post(register);
router.route("/users/login").post(login);

//* Review Crud
router.route("/users/review/create").post(verifyJWT, createReview);
router.route("/users/review/fetchall").get(getReview);
router.route("/users/review/update/:id").put(verifyJWT, updateReview);
router.route("/users/review/delete/:id").delete(verifyJWT, deleteReview);

export default router;
