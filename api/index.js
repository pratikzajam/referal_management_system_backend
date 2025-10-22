import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.join(__dirname, '..', '.env') });

import express from 'express'
import cors from 'cors';
import connectDb from '../src/Config/db.config.js'
import cookieParser from "cookie-parser";
import user from '../src/routes/auth.routes.js';
import candidate from '../src/routes/candidate.routes.js';
import metrics from '../src/routes/metrics.routes.js'



const app = express()
const port = process.env.PORT

connectDb()

app.use(cors({
  origin:process.env.Frontend_url,
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
