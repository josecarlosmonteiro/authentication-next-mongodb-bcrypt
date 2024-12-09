import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1)
      return;

    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("Banco de dados conectado.");
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;