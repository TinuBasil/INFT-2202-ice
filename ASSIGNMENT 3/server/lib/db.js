const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const connectDb = async () => {
    try {

        if (!process.env.MONGO_URL) {
            console.error("❌ MONGO_URL environment variable is not defined");
            process.exit(1);
        }
       

        await mongoose.connect(process.env.LOCAL_URI);

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = { connectDb };
