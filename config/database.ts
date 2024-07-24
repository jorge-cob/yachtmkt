import mongoose, { Mongoose } from 'mongoose';

let connected: boolean = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (connected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default connectDB;
