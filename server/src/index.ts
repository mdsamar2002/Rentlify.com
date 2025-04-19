import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from "cloudinary";
import hotelRoute from "./routes/my-hotels.js"
dotenv.config({});
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`app is listening and port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("db connection error found", error);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  
app.use(express.static(path.join(__dirname,"../../client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/user", authRoutes);
app.use("/api/my-hotels",hotelRoute)


