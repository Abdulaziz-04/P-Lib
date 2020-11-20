const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//Creating two models Books and Authors

//Books consists of 3 properties Name Genre AuthorName
const bookSchema = new Schema({
    name: String,
    genre: String,
    author: String,
});

const Book = model("Books", bookSchema);

//Author consists of 2 properties Name Age
const authorSchema = new Schema({
    name: String,
    age: Number,
});

const Author = model("Authors", authorSchema);

module.exports.Author = Author;
module.exports.Book = Book;