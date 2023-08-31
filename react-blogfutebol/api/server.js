import express from 'express';
import  connectDB  from './instances/mongo.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRoutes from './routes/api.js';
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


dotenv.config();


const server = express();
server.use(express.json());



server.use(cors());
server.use(mainRoutes);
server.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
});
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
})



server.listen("4001", ()=>{
    connectDB();
    console.log("Backend is runing")
})