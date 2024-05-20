import dotenv from 'dotenv'
import express from 'express'
import { bootstrap } from './src/bootstrap.js'
import {connectDB} from './DB/connectDB.js'
import {v2 as cloudinary} from 'cloudinary';


// config
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const app = express()
connectDB();
bootstrap(app)


const PORT = process.env.LOCAL_PORT

app.listen(PORT || process.env.PORT , () => console.log(` app listening on port ${PORT}!`))