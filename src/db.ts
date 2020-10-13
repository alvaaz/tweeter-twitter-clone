import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.emx5p.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(">>> DB is connected");
  } catch (err) {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  }
}
