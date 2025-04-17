import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth.js";
const router = express.Router();

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password with 6 or more character is required").isLength(
      { min: 6 }
    ),
  ],
  async (req: Request, res: Response): Promise<any> => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          message: "user doesn't exist",
        });
      }
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(400).json({
          message: "invalid password",
        });
      }
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, { httpOnly: true, maxAge: 86400000 });
      return res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.post(
  "/validate-token",
  verifyToken,
  (req: Request, res: Response): void => {
    res.status(200).send({ userId: req.userId });
  }
);

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) }).send();
});
export default router;
