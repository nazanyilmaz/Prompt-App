import mongoose from "mongoose";

let isConnected = false; //watch to connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  //if already connect to DB sent warn
  if (isConnected) {
    return console.log("already connect to MongoDB");
  }
  //if already don't connect to DB connection
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "promptmaniaDB",
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connect To MongoDB ");
  } catch (error) {
    console.log(error);
  }
};
