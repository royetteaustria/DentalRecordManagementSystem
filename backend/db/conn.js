import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI, {
      dbName: 'DENTAL_RECORD_MANAGEMENT_SYSTEM'
    });
    console.log(`Connected to database`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;