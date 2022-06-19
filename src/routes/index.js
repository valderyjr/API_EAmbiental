const productRoutes = require ('./Product')

const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).json({mensagem: "Welcome to my API"})
	})

	app.use('/products', productRoutes)
}

module.exports = routes