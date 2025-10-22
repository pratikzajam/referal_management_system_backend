import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors';
import connectDb from '../src/Config/db.config.js'
import cookieParser from "cookie-parser";
import user from '../src/Routes/auth.routes.js';
import candidate from '../src/Routes/candidate.routes.js';
import metrics from '../src/Routes/metrics.routes.js'



const app = express()
const port = process.env.PORT

connectDb()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));



app.use(express.json())






app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/api/auth", user)
app.use("/api/candidate", candidate)
app.use("/api/matrics", metrics)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
