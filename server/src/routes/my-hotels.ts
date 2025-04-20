import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel.js";
import verifyToken from "../middlewares/auth.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});
router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response):Promise<any> => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromise);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();
      return res.status(201).send(hotel);
    } catch (error) {
      console.log("error at creating hotels", error);
      return res.status(500).json({ message: "something went wrong" });
    }
  }
);

export default router;
