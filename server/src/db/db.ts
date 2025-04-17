import mongoose from "mongoose";

const dbConnect = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URI as string)
     .then(()=>{
        console.log("database connected successfully")
     })
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect