import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from './Routes/AuthRoute.js'
import { errorHandler, notFound } from "./middilewares/errorMiddleware.js";
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import cors from "cors"
import UploadeRoute from "./Routes/UplodeRoute.js"
import ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from './Routes/MessageRoute.js'
import AdminAuthRoute from './Routes/AdminAuthRoute.js'
import AdminUserRoute from './Routes/AdminUserRoute.js'
import logger from 'morgan'

//Routes
const app = express();

//to serve images for public

app.use(express.static('public'))
app.use('/images',express.static("images"))





//Middleware
app.use(logger('dev'))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(notFound)
// app.use(errorHandler)
app.use(cors())
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`listing portNumber ${process.env.PORT} And DB connected`)))
  .catch((error)=>console.log(error));



  //usage of routes
  app.use('/auth',AuthRoute) 
  app.use('/user',UserRoute) 
  app.use('/post',PostRoute)
  app.use('/upload',UploadeRoute)
  app.use("/chat",ChatRoute)
  app.use("/message",MessageRoute)
  app.use('/admin',AdminAuthRoute)
  app.use('/adminUser/',AdminUserRoute)
  
  
   