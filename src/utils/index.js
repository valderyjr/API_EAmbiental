const itNotExists = (res, name, getAll = false) => {
	const messageError = getAll ? `We does not have any ${name}` : `This ${name} does not exist`
	return res.status(404).json({
		message: messageError
	})
}

module.exports = {
	itNotExists
}
