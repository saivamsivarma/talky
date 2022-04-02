import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import postRoutes from './Routes/post.js';
import userRoutes from './Routes/user.js';
import friendsRoutes from "./Routes/friends.js";
const app = express();


dotenv.config();

app.use(bodyParser.json({limit:"30mb",extened:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/post',postRoutes);
app.use('/user',userRoutes);
app.use('/friends',friendsRoutes);


const CONNECTION_STRING ="mongodb+srv://vamsi:talky_05@talky.642r7.mongodb.net/Database?retryWrites=true&w=majority"

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));