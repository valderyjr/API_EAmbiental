const ecoLabelsModel = require ('../../models/EcologicalLabels')
const {itNotExists, responseError} = require('../../utils')

class EcologicalLabelsController {
	static register = async (req, res) => {
		try {
			const {body: dataEcoLabel} = req

			const dataImage = {
				imageURL: req.file.location,
				imageName: req.file.originalname,
				imageKey: req.file.key
			}

			dataEcoLabel.image = dataImage
			
			const newEcoLabel = new ecoLabelsModel(dataEcoLabel)

			await newEcoLabel.save()
			
			return res.status(201).json({
				message: "Ecological label created!",
				data: newEcoLabel
			})
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to create this ecological label")
		}
	}

	static getAll = async (req, res) => {
		try {
			const allEcoLabels = await ecoLabelsModel.find()

			return allEcoLabels.length > 0 ? 
			res.status(200).json({
				message: "These are all ecological labels",
				data: allEcoLabels
			})
			:
			itNotExists(res, 'ecological labels', true)
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get all ecological labels")
		}
	}

	static getOne = async (req, res) => {
		try {
			const {id} = req.params
			const ecoLabel = await ecoLabelsModel.findById(id)

			return ecoLabel ?
			res.status(200).json({
				message: "This is your ecological label",
				data: ecoLabel
			})
			:
			itNotExists(res, 'ecological label')
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get this ecological label")
		}
	}

	static updateOne = async (req, res) => {
		try {
			const {id} = req.params
			const {body: newData} = req

			if (req.file) {
				const dataImage = {
					imageURL: req.file.location,
					imageName: req.file.originalname,
					imageKey: req.file.key
				}	
				newData.image = dataImage
			}

			const updatedEcoLabel = await ecoLabelsModel.findByIdAndUpdate(id, newData, {new: true})

			updatedEcoLabel ? 
			res.status(200).json({
				message: "This is your updated ecological label",
				data: updatedEcoLabel
			}) 
			:
			itNotExists(res, 'category')
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to update this ecological label")
		}
	}

	static deleteOne = async (req, res) => {
		try {
			const {id} = req.params

			const ecoLabelToDelete = await ecoLabelsModel.findById(id)

			return ecoLabelToDelete ? 
			ecoLabelToDelete.remove() &
			res.status(200).json({
				message: "This ecological label was deleted!"
			})
			:
			itNotExists(res, 'ecological label') 

		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to delete this ecological label")
		}
	}
}

module.exports = EcologicalLabelsController