// Creating models for Posts 

import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    name: {type: String, required: true},
    prompt: {type: String, required: true},
    photo: {type: String, required: true},
});

const PostSchema = mongoose.model('Post', Post) // syntax mongoose.model('which model(=Post)', schema variable=Post)

export default PostSchema;  

// Now we can use it when generating new posts

