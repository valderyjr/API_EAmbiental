const mongoose = require('mongoose')
const aws = require("aws-sdk");

const s3 = new aws.S3();

const ecologicalLabelsSchema = new mongoose.Schema({
	name: {type: String, required: true},
	label: {type: String, required: true},
	text: {type: String, required: true},
	image: {
		imageURL: String,
		imageName: String,
		imageKey: String
	} 
})

ecologicalLabelsSchema.pre("remove", function () {
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

const EcologicalLabels = mongoose.model('eco-labels', ecologicalLabelsSchema)

module.exports = EcologicalLabels