const itNotExists = (res, name, getAll = false) => {
	const messageError = getAll ? `We does not have any ${name}` : `This ${name} does not exist`
	return res.status(404).json({
		message: messageError
	})
}

const responseError = (res, statusCode, error, message) => {
	return res.status(400).json({
		message: message,
		error: error.message
	})
}
module.exports = {
	itNotExists,
	responseError
}
