const productRoutes = require ('./Product')
const categoryRoutes = require ('./Category')
const ecoLabelRoutes = require ('./EcologicalLabels')
const userRoutes = require ('./User')

const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).json({mensagem: "Welcome to my API"})
	})

	app.use('/products', productRoutes)
	app.use('/categories', categoryRoutes)
	app.use('/eco-labels', ecoLabelRoutes)
	app.use('/users', userRoutes)
}

module.exports = routes