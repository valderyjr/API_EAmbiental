const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
	{
		name: {type: String, required: [true, 'Name is required!']},
		companyName: {type: String, required: [true, 'Company name is required!']},
		price: {type: Number, required: [true, 'Price is required!'], min: [0.1, 'Price cannot be negative or zero!']},
		imageURL: {type: String, required: [true, 'Image is required!']},
		category: {type: String, required: [true, 'Category is required!']},
		description: {type: String, required: [true, 'Description is required!']},
		ecologicalLabels: {type: [String], required: [true, 'Ecological labels are required!']}
	}
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product