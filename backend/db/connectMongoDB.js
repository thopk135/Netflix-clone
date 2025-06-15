import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        process.exit(1);
    }
}

export default connectMongoDB;