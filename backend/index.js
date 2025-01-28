import express from "express";
import { dbConnect } from "./connection/db.connect.js";
import morgan from "morgan";
import cors from "cors"

const app = express();


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:'*',
  optionsSuccessStatus:200
}))

if(process.argv[2] !== 'production'){
  app.use(morgan('dev'))
}


dbConnect()

app.get('/', (req, res) => {
  res.send(`Server started`)
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})