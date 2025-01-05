import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(`Connect to db failed: ${error}`);
    }
};

export default connectDb;
