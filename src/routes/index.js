const productRoutes = require ('./Product')
const categoryRoutes = require ('./Category')

const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).json({mensagem: "Welcome to my API"})
	})

	app.use('/products', productRoutes)
	app.use('/categories', categoryRoutes)
}

module.exports = routes