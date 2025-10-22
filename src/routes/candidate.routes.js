import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { referCandidate, getAllCandidates, deleteCandidate, updateCandidateStatus } from '../controllers/candidate.controller.js';
import auth from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js';

let candidate = express.Router()



candidate.post("/candidates/:userId", upload.single("resume"),auth,referCandidate);
candidate.get("/candidates/:userId",auth, getAllCandidates);
candidate.delete("/candidates/:candidateId",auth,deleteCandidate);
candidate.put("/candidates/:candidateId",  auth,updateCandidateStatus);




export default candidate