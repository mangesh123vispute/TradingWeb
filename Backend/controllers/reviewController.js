const Review = require("../models/review.models");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
