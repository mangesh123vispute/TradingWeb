import Review from "../models/review.models.js";
import User from "../models/user.models.js";
import mongoose from "mongoose";

//* Create Rating and Review
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
  console.log("This is the req id ", req.user._id);
  try {
    const { content, rating } = req.body;
    console.log(`createReview ${req.user._id} ${content} ${rating}`);
    if (!(content && rating)) {
      return res
        .status(400)
        .json({ status: "fail", message: "All fields are required" });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ status: "fail", message: "Rating must be between 1 to 5" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User does not exist" });
    }
    const review = await Review.findOne(req.user._id);
    if (review) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already reviewed" });
    }

    const NewReview = await Review.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        NewReview,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      status: "fail",
      message: err?.message,
    });
  }
};

//* Get Rating and Review
//algo
//get all reviews
//send them to frontend
// (accessable to all )
export const getReview = async (req, res) => {
  try {
    const allReviews = await Review.find();
    res.status(200).json({
      status: "success",
      data: {
        reviews: allReviews,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
};

//* update review
// algo
//check if user is login or not
//get the id of the review form the params
//check if the id is in the database
// get all the data from the request body
//check if content is not empty
// if not empty then update the review
// send response

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params; // Extracting ID from request parameters
    const { content, rating } = req.body;

    // Check if all required fields are present
    if (!(content && rating)) {
      return res
        .status(400)
        .json({ status: "fail", message: "All fields are required" });
    }

    //chacking if rating is between 1 to 5
    if (rating < 1 || rating > 5) {
      return res
        .status(405)
        .json({ status: "fail", message: "Rating must be between 1 to 5" });
    }

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid review ID" });
    }

    // Check if the review exists
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res
        .status(404)
        .json({ status: "fail", message: "Review not found" });
    }

    // check if review object user and logged in user are same
    if (existingReview.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ status: "fail", message: "You are not authorized" });
    }
    // Update the review with the new data
    existingReview.content = content;
    existingReview.rating = rating;
    await existingReview.save();
    // Send the updated review as a response
    res.status(200).json({
      status: "success",
      data: {
        review: existingReview,
      },
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({
      status: "error",
      message: "Failed to update review",
      error: err.message,
    });
  }
};

//* Delete review
//algo
//check if user is login or not
//get the id of the review form the params
//delete the review
// send response

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const existingReview = await Review.findById(id);

    if (!existingReview) {
      return res
        .status(404)
        .json({ status: "fail", message: "Review not found" });
    }

    if (existingReview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized, You can only delete your review",
      });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      data: {
        review: existingReview,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete review",
      error: err.message,
    });
  }
};
