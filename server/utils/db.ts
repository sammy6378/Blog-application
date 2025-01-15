import mongoose from "mongoose";

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async() => {
    try {
        await mongoose.connect(MONGODB_URI).then(data => {
            console.log(`Database connected: ${data.connection.host}`);
        })

    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;