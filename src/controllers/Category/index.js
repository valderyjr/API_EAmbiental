const categoryModel = require ('../../models/Category')
const {itNotExists, responseError} = require('../../utils')

class CategoryController {
	static register = async (req, res) => {
		try {
			const {body: dataCategory} = req
			
			const newCategory = new categoryModel(dataCategory)

			await newCategory.save()
			
			return res.status(201).json({
				message: "Category created!",
				data: newCategory
			})
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to create this category")
		}
	}

	static getAll = async (req, res) => {
		try {
			const allCategories = await categoryModel.find()

			return allCategories.length > 0 ? 
			res.status(200).json({
				message: "These are all categories",
				data: allCategories
			})
			:
			itNotExists(res, 'categories', true)
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get all categories")
		}
	}

	static getOne = async (req, res) => {
		try {
			const {id} = req.params
			const category = await categoryModel.findById(id)

			return category ?
			res.status(200).json({
				message: "This is your category",
				data: category
			})
			:
			itNotExists(res, 'category')
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get this category")
		}
	}

	static updateOne = async (req, res) => {
		try {
			const {id} = req.params
			const {body: newData} = req

			const updatedCategory = await categoryModel.findByIdAndUpdate(id, newData, {new: true})

			updatedCategory ? 
			res.status(200).json({
				message: "This is your updated category",
				data: updatedCategory
			}) 
			:
			itNotExists(res, 'category')
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to update this category")
		}
	}

	static deleteOne = async (req, res) => {
		try {
			const {id} = req.params

			const categoryToDelete = await categoryModel.findById(id)

			return categoryToDelete ? 
			categoryToDelete.remove() &
			res.status(200).json({
				message: "This category was deleted!"
			})
			:
			itNotExists(res, 'category') 

		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to delete this category")
		}
	}
}

module.exports = CategoryController