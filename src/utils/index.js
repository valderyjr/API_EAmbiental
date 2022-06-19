const itNotExists = (res, name) => {
	return res.status(404).json({
		message: `This ${name} does not exist.`
	})
}

module.exports = {
	itNotExists
}
