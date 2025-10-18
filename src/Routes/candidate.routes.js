import express from 'express';
import { signup, login } from '../Controllers/auth.controller.js';
import { referCandidate, getAllCandidates, deleteCandidate, updateCandidateStatus } from '../Controllers/Candidate.Controller.js';
import auth from "../Middlewares/auth.middleware.js"
import upload from '../Middlewares/multer.middleware.js';

let candidate = express.Router()



candidate.post("/candidates/:userId", upload.single("resume"), auth, referCandidate);
candidate.get("/candidates/:userId", auth, getAllCandidates);
candidate.delete("/candidates/:candidateId", auth, deleteCandidate);
candidate.put("/candidates/:candidateId", auth, updateCandidateStatus);




export default candidate