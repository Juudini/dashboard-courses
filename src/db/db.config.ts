import { connect, Connection, Mongoose } from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  private mongoose: Mongoose | null = null;
  private connection: Connection | null = null;

  async connect(options: Options) {
    const { mongoUrl, dbName } = options;
    try {
      const mongooseOptions = {
        mongoUrl,
        dbName: dbName,
        useNewUrlParser: true, // Add any other options you need
        useUnifiedTopology: true,
      };

      this.mongoose = await connect(mongoUrl, mongooseOptions);
      this.connection = this.mongoose.connection;
      console.info("🔌 DB connected");
      return true;
    } catch (err) {
      console.error("Error in MongoDB connect. Details: ", err);
      throw err;
    }
  }

  async close() {
    try {
      if (this.mongoose) {
        await this.mongoose.disconnect();
        console.info("🔌 DB connection closed");
      }
    } catch (err) {
      console.error("Error in closing MongoDB connection. Details: ", err);
      throw err;
    }
  }
}
