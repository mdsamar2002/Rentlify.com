import express, { Request, Response } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { check } from "express-validator/lib/middlewares/validation-chain-builders.js";
import { validationResult } from "express-validator";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/register",
  [
    check("firstname", "First Name is required").isString(),
    check("lastname", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more character required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response): Promise<any> => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({
          message: "user already exist",
        });
      }
      user = new User(req.body);
      await user.save();
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 86400000,
        secure: false,
      });
      return res.status(200).send({
        message: "user registered successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "something went wrong",
      });
    }
  }
);



export default router;
