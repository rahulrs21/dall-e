// Add additional routes that we can call from the frontend 1:13:30
import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'  
// https://console.cloudinary.com/  here goto dashboard, There copy and paste 3 things in .env file. They are 'cloudname', 'apikey', 'apisecret'

import Post from '../mongodb/models/post.js'

dotenv.config(); //pull our environment variables from .env file

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// 2 routes, 'Get all post' and 'Create a post'
// GET ALL POST
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts});

    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
});

// CREATE A POST
router.route('/').post(async (req, res) => {
    try {
        const {name, prompt, photo} = req.body;  // destructurizing all data which come from  frontend
        const photoUrl = await cloudinary.uploader.upload(photo);  // here we uploading 'photo(from our system)'  to cloudinary, so that cloudinary gives u url

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({success: true, data: newPost});

    } catch (error) {
        res.status(500).json({success: false, message: error});
    }

});

export default router;
