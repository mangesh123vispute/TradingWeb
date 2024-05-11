import User from "../models/user.models.js";
import Review from "../models/review.models.js";

//* Generate access token and refresh token
const generateAccessTokenAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  console.log("this is the user ", user);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  console.log(
    "this is the access token and refresh token",
    accessToken,
    refreshToken
  );
  return { accessToken, refreshToken };
};

// * Register user (POST request)
// algo
// 1. Check if user already exists with respect to its email
// 2. Take data from the request body
// 3. validate the user data
// 4. Create a new user
// 5. Send response
// store the password in hash format

export const register = (req, res) => {
  try {
    //getting data from the frontend
    const { firstName, lastName, email, password, mobileNumber } = req.body;

    // checking is all fields are available or not
    if (
      [firstName, lastName, email, mobileNumber, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res
        .status(400)
        .json({ status: "fail", message: "All fields are required" });
    }
    User.findOne({ email }).then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ status: "fail", message: "User already exists" });
      }
    });
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          status: "success",
          data: {
            user,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.message,
        });
      });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// * Login
// algo
// 1. Get user crediantial form the forntend like , password and email
// 2. check if user is register by checking the email in the backend
// 3. check password is correct or not , by using the becrypt
//4. Generate the access and refresh token
// 5. send the access and refresh token if user is authenticated correctly

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
      return res
        .status(400)
        .json({ status: "fail", message: "All fields are required" });
    }
    User.findOne({ email }).then(async (user) => {
      if (!user) {
        return res
          .status(400)
          .json({ status: "fail", message: "User does not exist" });
      }
      if (!user.isPasswordCorrect(password)) {
        return res
          .status(400)
          .json({ status: "fail", message: "Incorrect password" });
      }
      const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshTokens(user._id);

      console.log(
        "THis are the access token and refresh token",
        accessToken,
        refreshToken
      );
      res.status(200).json({
        status: "success",
        data: {
          accessToken,
          refreshToken,
        },
      });
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
