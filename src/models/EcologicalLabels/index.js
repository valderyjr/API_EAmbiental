const mongoose = require('mongoose')

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

const EcologicalLabels = mongoose.model('eco-labels', ecologicalLabelsSchema)

module.exports = EcologicalLabels