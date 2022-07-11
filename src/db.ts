import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const DEV = 'mongodb://mongo/mydb';
// const PROD = 'mongodb://localhost:27017/mydb';

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('>>> DB is connected');
  } catch (err) {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    );
  }
}
