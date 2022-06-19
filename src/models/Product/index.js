const mongoose = require('mongoose')
const aws = require("aws-sdk");

const s3 = new aws.S3();

const productSchema = new mongoose.Schema(
	{
		name: {type: String, required: [true, 'Name is required!']},
		companyName: {type: String, required: [true, 'Company name is required!']},
		price: {type: Number, required: [true, 'Price is required!'], min: [0.1, 'Price cannot be negative or zero!']},
		image: {
			imageURL: String,
			imageName: String,
			imageKey: String
		},
		category: {type: String, required: [true, 'Category is required!']},
		description: {type: String, required: [true, 'Description is required!']},
		ecologicalLabels: {type: [String], required: [true, 'Ecological labels are required!']}
	}
)

productSchema.pre('save', function () {
	const newEcologicalLabels = this.ecologicalLabels.join('').split(',')
	this.ecologicalLabels = newEcologicalLabels
})

productSchema.pre("remove", function () {
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

const Product = mongoose.model('Product', productSchema)

module.exports = Product