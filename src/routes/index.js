const productRoutes = require ('./Product')
const categoryRoutes = require ('./Category')
const ecoLabelRoutes = require ('./EcologicalLabels')
const userRoutes = require ('./User')
const {isAuth} = require ('../middlewares/auth')


const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).json({mensagem: "Welcome to my API"})
	})
	
	app.use('/products', isAuth, productRoutes)
	app.use('/categories', isAuth, categoryRoutes)
	app.use('/eco-labels', isAuth, ecoLabelRoutes)
	app.use('/users', userRoutes)
}

module.exports = routes