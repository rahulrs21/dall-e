import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true) // useful when working with search functionality

    mongoose.connect(url)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));  
}

export default connectDB;  // so that we can import file from index.js


