const mongoose = require('mongoose')
const aws = require("aws-sdk")

const s3 = new aws.S3()

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

userSchema.pre("remove", function () {
	const {imageKey} = this.image
	s3
	.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: imageKey
      })
      .promise()
      .catch(response => {
        console.log(response);
      });
})

const User = mongoose.model('User', userSchema)

module.exports = User