// npm install cloudinary(used to store images) cors(cross origin requests) dotenv(storing secret) express mongoose nodemon openai
// add "type": "module", below "description" in package.json , we're working with Es6 modules. This allows same import export statements as in react.


import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config(); // this allows to pull our environment variables from .env file

const app = express();  // initialize express
app.use(cors());   // middleware
app.use(express.json({ limit: '50mb' }));  // middleware

app.use('/api/v1/post', postRoutes);  // middleware
app.use('/api/v1/dalle', dalleRoutes); // middleware       // Essentially for both 2 middleware, we created API endpoints that we can connect or hook onto from Front-End Side

app.get('/', async (req, res) => {
    res.send('Hello from Server');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL) 
        // MONGODB_URL is special url of MongoDB Atlas Database which is stored in .env file. create that file and 
        // before that, open this 'https://mongodb.com/atlas/database' and do the setting 1:07:00 
        // after setting username and password you'll get link in 'database' section copy and paste in .env file and Replace <password> with the actual password 
        
        app.listen(8080, () => console.log("Sever has started running on http://localhost:8080"))
    } catch (error) {
        console.log(error)
    }

}

startServer();

