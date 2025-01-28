import express from "express";
import { dbConnect } from "./connection/db.connect.js";


const app = express();

dbConnect()

app.get('/', (req, res) => {
  res.send(`Server started`)
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})