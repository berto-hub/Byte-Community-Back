const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    //_id: ObjectId,
    id: String,
    username: String,
    email: String,
    password: String,
    follows: [String]
});

module.exports = model('User', userSchema);