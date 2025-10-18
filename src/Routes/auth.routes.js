import express from 'express';
import { signup, login } from '../Controllers/auth.controller.js';

import auth from "../Middlewares/auth.middleware.js"
import upload from '../Middlewares/multer.middleware.js';

let user = express.Router()

user.post("/signup", signup);
user.post("/login", login);



export default user