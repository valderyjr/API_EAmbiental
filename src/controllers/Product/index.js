const productModel = require ('../../models/Product')

class ProductController {

	static register = async (req, res) => {
		try {
			const {body: dataProduct} = req
			const newProduct = new productModel(dataProduct)

			await newProduct.save()

			return res.status(201).json({
				message: "Product created!",
				data: newProduct
			})
		} catch (error) {
			return res.status(400).json({
				message: "An error occurred while trying to create this product",
				error: error.message
			})
		}
	}

	static getAll = async (req, res) => {
		try {
			const allProducts = await productModel.find()

			return res.status(200).json({
				message: "These are all products",
				data: allProducts
			})

		} catch (error) {
			return res.status(400).json({
				message: "An error occurred while trying to get all products",
				error: error.message
			})
		}
	}

	static getOne = async (req, res) => {
		try {
			const {id} = req.params
			const product = await productModel.findById(id)

			return res.status(200).json({
				message: "This is your product",
				data: product
			})
		} catch (error) {
			return res.status(400).json({
				message: "An error occurred while trying to get this product",
				error: error.message
			})
		}
	}

	static updateOne = async (req, res) => {
		try {
			const {id} = req.params
			const {body: newData} = req

			const updatedProduct = await productModel.findByIdAndUpdate(id, newData, {new: true})

			return res.status(200).json({
				message: "This is your updated product",
				data: updatedProduct
			})
		} catch (error) {
			return res.status(400).json({
				message: "An error occurred while trying to update this product",
				error: error.message
			})
		}
	}

	static deleteOne = async (req, res) => {
		try {
			const {id} = req.params

			await productModel.findByIdAndDelete(id)
			
			return res.status(200).json({
				message: "This product was deleted!"
			})
		} catch (error) {
			return res.status(400).json({
				message: "An error occurred while trying to delete this product",
				error: error.message
			})
		}
	}
}

module.exports = ProductController