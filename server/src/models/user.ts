import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../typeShared/type.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = mongoose.model<UserType>("user", userSchema);
export default User;
