// used to generate the data from API, so get API click https://platform.openai.com/account/api-keys create new 'secret_key' api and paste it on OPENAI_API_KEY='secret_key' in .env file

import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); //pull our environment variables from .env file

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send("Helloo From DALLE!")
})

router.route('/').post(async (req,res) => {
    try {
        const { prompt } = req.body; // {prompt} destructuring prompt.  this 'req.body' is gonna come from frontend side

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,  // 1 image
            size: '1024x1024',
            response_format: 'b64_json'
        });

        // we need to get image out of above aiResponse
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image }); // getting the image and send it back to frontend

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

export default router


