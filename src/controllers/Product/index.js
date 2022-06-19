const productModel = require ('../../models/Product')
const {itNotExists, responseError} = require('../../utils')

class ProductController {

	static register = async (req, res) => {
		try {
			const {body: dataProduct} = req

			const {ecologicalLabels} = dataProduct
			const newEcoLabels = ecologicalLabels.split(',')

			dataProduct.ecologicalLabels = newEcoLabels
			
			const dataImage = {
				imageURL: req.file.location,
				imageName: req.file.originalname,
				imageKey: req.file.key
			}

			dataProduct.image = dataImage
			const newProduct = new productModel(dataProduct)

			await newProduct.save()

			return res.status(201).json({
				message: "Product created!",
				data: newProduct
			})
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to create this product")
		}
	}

	static getAll = async (req, res) => {
		try {
			const allProducts = await productModel.find()
			.populate({path: "category", model: "Category"})
			.populate({path: "ecologicalLabels", model:"eco-labels"})

			return allProducts.length > 0 ? 
			res.status(200).json({
				message: "These are all products",
				data: allProducts
			})
			:
			itNotExists(res, 'products', true)

		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get all products")
		}
	}

	static getOne = async (req, res) => {
		try {
			const {id} = req.params
			const product = await productModel.findById(id)
			.populate({path: "category", model: "Category"})
			.populate({path: "ecologicalLabels", model:"eco-labels"})

			return product ?
			res.status(200).json({
				message: "This is your product",
				data: product
			})
			:
			itNotExists(res, 'product')
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get this product")
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

			const updatedProduct = await productModel.findByIdAndUpdate(id, newData, {new: true})

			updatedProduct ? 
			res.status(200).json({
				message: "This is your updated product",
				data: updatedProduct
			}) 
			:
			itNotExists(res, 'product') 
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to update this product")
		}
	}

	static deleteOne = async (req, res) => {
		try {
			const {id} = req.params

			const productToDelete = await productModel.findById(id)

			return productToDelete ? 
			productToDelete.remove() &
			res.status(200).json({
				message: "This product was deleted!"
			})
			:
			itNotExists(res, 'product') 

		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to delete this product")
		}
	}
}

module.exports = ProductController