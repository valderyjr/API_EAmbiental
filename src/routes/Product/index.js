const router = require('express').Router()
const ProductController = require('../../controllers/Product')
const multer = require('multer')
const multerConfig = require('../../config/multer')

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.post('/', multer(multerConfig).single('file'), ProductController.register)
router.put('/:id', multer(multerConfig).single('file'), ProductController.updateOne)
router.delete('/:id', ProductController.deleteOne)

module.exports = router