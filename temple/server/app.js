import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";

//Routes
import postRoutes from "./routes/api/post"
import userRoutes from './routes/api/user'
import authRoutes from './routes/api/auth'

import morgan from "morgan";

const app = express();
const {MONGO_URI} = config;

app.use(hpp());
app.use(helmet());

//다른 포트에서 접속
app.use(cors({origin: true, credentials:true}))
//개발할때 로그를 보게 해주는것
app.use(morgan("dev"));

app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
    })
    .then(()=> console.log("MongoDB connecting Success!!"))
    .catch((e) => console.log(e));

//use routes
app.get('/');
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

export default app;