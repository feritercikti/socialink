import mongoose, { mongo } from 'mongoose';

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(process.env.MONGO_URL!);
};

export default dbConnect;
