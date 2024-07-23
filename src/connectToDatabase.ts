import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongodb connected successfully");
    });

    connection.on("error", () => {
      console.log("Mongodb connection error");
    });
  } catch (error: any) {
    console.log("Mongodb connection error:", error.message);
  }
}
