const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user: String,
    text: String,
},{timestamps: true})

const NotesDB = mongoose.model('Notes', NotesSchema);

module.exports = NotesDB