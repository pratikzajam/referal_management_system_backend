import express from 'express';
import cors from 'cors';
import connectDb from '../src/config/db.config.js';
import cookieParser from "cookie-parser";
import user from '../src/routes/auth.routes.js';
import candidate from '../src/routes/candidate.routes.js';
import metrics from '../src/routes/metrics.routes.js';

const app = express();
const port = process.env.PORT || 3000;

connectDb();

const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173','https://referal-management-system-frontend.vercel.app'];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); // allow requests like Postman
        if(allowedOrigins.includes(origin)){
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/auth", user);
app.use("/api/candidate", candidate);
app.use("/api/matrics", metrics);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
