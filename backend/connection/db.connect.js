import { connect } from "mongoose";

let uriObject = {
  production: process.env.MONGODB_URI_PRODUCTION,
  development: process.env.MONGODB_URI_LOCAL,
};

const mode = process.argv[2];

export const dbConnect = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URI_PRODUCTION, { dbName: "opportuniCRM_DB" });
    console.log(
      `successfully connected to database, \nmode ${mode}, \nhost: ${conn.connection.host}, \ndbName: ${conn.connection.db.databaseName}`
    );
  } catch (error) {
    console.error("Error while connecting to database", error);
  }
};
