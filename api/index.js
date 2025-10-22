import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import express from 'express'
import cors from 'cors';
import connectDb from '../src/config/db.config.js'
import cookieParser from "cookie-parser";
import user from '../src/routes/auth.routes.js';
import candidate from '../src/routes/candidate.routes.js';
import metrics from '../src/routes/metrics.routes.js'

const app = express()
const port = process.env.PORT || 3000

connectDb()

// Fix CORS configuration
app.use(cors({
  origin: [
    process.env.Frontend_url,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

// Handle preflight requests
app.options('*', cors());

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