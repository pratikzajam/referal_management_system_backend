import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';

import auth from "../middlewares/auth.middleware.js"
import upload from '../middlewares/multer.middleware.js';

let user = express.Router()

user.post("/signup", signup);
user.post("/login", login);



export default user