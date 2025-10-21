import express from 'express';
import { getReferedCandidates } from '../Controllers/metrics.controller.js';

import auth from "../Middlewares/auth.middleware.js"
import upload from '../Middlewares/multer.middleware.js';

let metrics = express.Router()

metrics.get("/getReferedCandidates/:userId",auth, getReferedCandidates);




export default metrics