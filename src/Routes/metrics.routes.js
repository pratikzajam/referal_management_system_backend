import express from 'express';
import { getReferedCandidates } from '../controllers/metrics.controller.js';

import auth from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js';

let metrics = express.Router()

metrics.get("/getReferedCandidates/:userId", getReferedCandidates);




export default metrics