const router = require('express').Router()
const CategoryController = require('../../controllers/Category')
const {isAdmin} = require('../../middlewares/auth')

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getOne)
router.post('/', isAdmin, CategoryController.register)
router.put('/:id', isAdmin, CategoryController.updateOne)
router.delete('/:id', isAdmin, CategoryController.deleteOne)

module.exports = router