import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json("Not authorized");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(401).json(" user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error?.message || "invalid token");
  }
};
