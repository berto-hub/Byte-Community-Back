const {Schema, model} = require("mongoose");

const commentSchema = new Schema({
    //_id: ObjectId,
    id: String,
    date: Date,
    user: String,
    comment: String,
});

module.exports = model('Comments', commentSchema);