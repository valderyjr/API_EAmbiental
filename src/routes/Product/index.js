const router = require('express').Router()
const productModel = require('../../models/Product')
const ProductController = require('../../controllers/Product')

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.post('/', ProductController.register)
router.put('/:id', ProductController.updateOne)
router.delete('/:id', ProductController.deleteOne)
module.exports = router