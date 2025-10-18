import express from 'express'
import dotenv from 'dotenv';

import connectDb from './src/Config/db.config.js'
import cookieParser from "cookie-parser";
import user from './src/Routes/auth.routes.js';
import candidate from './src/Routes/candidate.routes.js';
import metrics from '../backend/src/Routes/metrics.routes.js'


dotenv.config();
const app = express()
const port = process.env.PORT

connectDb()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/api/auth", user)
app.use("/api/candidate", candidate)
app.use("/api/matrics", metrics)

app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
