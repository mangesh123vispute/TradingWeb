import Review from "../models/review.models.js";
import User from "../models/user.models.js";

//* Rating and Review
// Take user id , content and rating form the frontend
// check if user is registerd or not
// check if user already reviewed or not
// check if user already rated or not
// check if rating is between 1 to 5
// check if content is not empty
// check if rating is not empty
// create review
// send response
export const createReview = async (req, res) => {
  try {
    const { userId, content, rating } = req.body;
    console.log(`createReview ${userId} ${content} ${rating}`);
    if (!(userId && content && rating)) {
      return res
        .status(400)
        .json({ status: "fail", message: "All fields are required" });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ status: "fail", message: "Rating must be between 1 to 5" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User does not exist" });
    }
    const review = await Review.findOne({ userId });
    if (review) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already reviewed" });
    }

    const NewReview = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        NewReview,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err?.message,
    });
  }
};
