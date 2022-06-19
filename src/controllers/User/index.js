const userModel = require ('../../models/User')
const {itNotExists, responseError} = require('../../utils')
const bcrypt = require('bcrypt')

class UserController {

	static register = async (req, res) => {
		try {
			const {body: dataUser} = req

			const doesExist = await userModel.findOne({email: dataUser.email})
			if (doesExist) {
				const error = {
					message: "This user already exists!"
				}
				responseError(res, 409, error, "This user already exists!")
				return 
			}
			// const dataImage = {
			// 	imageURL: req.file.location,
			// 	imageName: req.file.originalname,
			// 	imageKey: req.file.key
			// }

			// dataUser.image = dataImage
			const newUser = new userModel({
				...dataUser,
				password: bcrypt.hashSync(dataUser.password, 10)
			})

			await newUser.save()

			return res.status(201).json({
				message: "User created!",
				data: {
					id: newUser.id,
					name: newUser.name,
					email: newUser.name,
					isAdmin: newUser.admin
				}
			})
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to create this user")
		}
	}

	static getAll = async (req, res) => {
		try {
			const allUsers = await userModel.find().select('-password')

			return allUsers.length > 0 ? 
			res.status(200).json({
				message: "These are all User",
				data: allUsers
			})
			:
			itNotExists(res, 'users', true)

		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get all users")
		}
	}

	static getOne = async (req, res) => {
		try {
			const {id} = req.params
			const user = await userModel.findById(id).select('-password')

			return user ?
			res.status(200).json({
				message: "This is your user",
				data: user
			})
			:
			itNotExists(res, 'user')
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to get this user")
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

			const updatedUser = await userModel.findByIdAndUpdate(id, newData, {new: true}).select('-password')

			updatedUser ? 
			res.status(200).json({
				message: "This is your updated user",
				data: updatedUser
			}) 
			:
			itNotExists(res, 'user') 
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to update this user")
		}
	}

	static deleteOne = async (req, res) => {
		try {
			const {id} = req.params

			const userToDelete = await userModel.findById(id)

			return userToDelete ? 
			userToDelete.remove() &
			res.status(200).json({
				message: "This user was deleted!"
			})
			:
			itNotExists(res, 'user') 
		} catch (error) {
			responseError(res, 400, error, "An error occurred while trying to delete this user")
		}
	}

	static login = async (req, res) => {
		try {
			const {body: dataUser} = req

			const userExists = await userModel.findOne({email: dataUser.email})
			if (!userExists) {
				const error = {
					message: "This user does not exists!"
				}
				responseError(res, 401, error, "This user does not exists!")
				return
			}

			const compareCredentials = await bcrypt.compareSync(dataUser.password, userExists.password)
			if (!compareCredentials) {
				const error = {
					message: "Error in your credentials!"
				}
				responseError(res, 401, error, "Error in your credentials!")
				return
			}

			const user = {
				id: userExists.id,
				email: userExists.email,
				name: userExists.name
			}

			return res.status(200).json({
				message: "Login made successfully",
				data: user
			})
		} catch (error) {
			responseError(res, 401, error, "An error occurred while trying to do login")
		}
	}
}

module.exports = UserController