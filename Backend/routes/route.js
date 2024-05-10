const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const reviewController = require("../controllers/reviewController");

router.post("/users", userController.createUser);
router.post("/reviews", reviewController.createReview);

module.exports = router;
