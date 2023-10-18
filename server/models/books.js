const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://reiine:${process.env.MONGOPASS}@cluster0.u7inkuy.mongodb.net/book-data`)
.then((res)=>{
    console.log("Mongoose connected");
})
.catch((e)=>{
    console.log("Error connecting to Mongoose");
});

const bookModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
});

const books = new mongoose.model('books', bookModel);

module.exports = books;