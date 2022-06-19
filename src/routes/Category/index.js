const router = require('express').Router()
const CategoryController = require('../../controllers/Category')

router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getOne)
router.post('/', CategoryController.register)
router.put('/:id', CategoryController.updateOne)
router.delete('/:id', CategoryController.deleteOne)

module.exports = router