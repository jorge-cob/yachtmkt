import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if (connected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
