import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotel.js";
import verifyToken from "../middlewares/auth.js";
import { HotelType } from "../typeShared/type.js";
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
  async (req: Request, res: Response): Promise<any> => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const imageUrls = await uploadImage(imageFiles);
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

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error at fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error while getting hotels" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response):Promise<any> => {
     try {
      const hotelId = req.params.hotelId;
      const updateHotel: HotelType = req.body;
      updateHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: hotelId,
          userId: req.userId,
        },
        updateHotel,
        { new: true }
      );
     
      if(!hotel){
       return res.status(404).json({message:"Hotel not found!"})
      }

      const imageFiles = req.files as Express.Multer.File[];
      const imageUploadedUrls = await uploadImage(imageFiles);
      updateHotel.imageUrls = [...imageUploadedUrls,...(updateHotel.imageUrls || [])]
      await hotel?.save();
      return res.status(201).json(hotel);
    } catch (error) {
     return res.status(500).json({ message: "Error while updating hotel" });
    }
  }
);

async function uploadImage(imageFiles: Express.Multer.File[]) {
  const uploadPromise = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromise);
  return imageUrls;
}

export default router;
