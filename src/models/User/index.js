const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {type: String, required: [true, 'Name is required!']},
	email: {type: String, required: [true, 'Email is required!'], unique: true},
	image: {
		imageURL: String,
		imageName: String,
		imageKey: String
	},
	password: {type: String, required: true},
	isAdmin: {type: Boolean, required: true, default: false}
})

const User = mongoose.model('User', userSchema)

module.exports = User