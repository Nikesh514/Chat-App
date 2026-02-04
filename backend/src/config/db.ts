import mongoose from 'mongoose';
import "dotenv/config";
export const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Mongodb connected successfully');
  } catch (e: unknown) {
    console.error('Error when connecting to the database', e);
    process.exit(1);
  }
};