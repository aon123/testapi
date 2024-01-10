const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
	email: String,
    password: String
    
},{ versionKey: false, timestamps: true })


const UserDB = mongoose.model('User', UserSchema)

module.exports = UserDB