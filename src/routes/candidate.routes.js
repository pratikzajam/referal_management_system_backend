import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { referCandidate, getAllCandidates, deleteCandidate, updateCandidateStatus } from '../controllers/candidate.controller.js';
import auth from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js';

let candidate = express.Router()



candidate.post("/candidates/:userId", upload.single("resume"),referCandidate);
candidate.get("/candidates/:userId", getAllCandidates);
candidate.delete("/candidates/:candidateId",deleteCandidate);
candidate.put("/candidates/:candidateId",updateCandidateStatus);




export default candidate