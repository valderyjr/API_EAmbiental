const jwt = require('jsonwebtoken')
const {responseError} = require('../utils')

const isAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization
		if (!token) {
			const error = {
				message: 'No token.'
			}
			responseError(res, 401, error, 'No token provided.')
			return
		}
		const onlyToken = token.split(' ')[1]

		jwt.verify(onlyToken, process.env.JWT_KEY, (error, decoded) => {
			if (error) {
				return responseError(res, 401, error, 'You are not authorized.')
			}

			req.user = decoded
			next()
		})
	} catch (error) {
		responseError(res, 401, error, 'You are not authorized.')
	}
}

const isAdmin = (req, res, next) => {
	try {
		if (req.user && req.user.isAdmin) {
			return next()
		} 
		return responseError(res, 403, error, 'You have not admin permissions.')
	} catch (error) {
		return responseError(res, 403, error, 'You have not admin permissions.')
	}
}

module.exports = {
	isAuth,
	isAdmin
}