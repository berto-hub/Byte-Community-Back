const { json } = require("express");
const {Schema, model} = require("mongoose");
const User = require("./User");

const userSchema = new Schema({
    id: String,
    username: String,
    email: String,
    password: String,
});

const videoSchema = new Schema({
    //_id: ObjectId,
    id: String,
    url: String,
    image: String,
    author: String,
    nameAuthor: String,
    title: String,
    date: Date,
    description: String,
    comments: [String],
});

module.exports = model('Video', videoSchema);