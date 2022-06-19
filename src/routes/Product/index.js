const router = require('express').Router()
const ProductController = require('../../controllers/Product')
const multer = require('multer')
const multerConfig = require('../../config/multer')
const {isAdmin} = require ('../../middlewares/auth')

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.post('/', isAdmin, multer(multerConfig).single('file'), ProductController.register)
router.put('/:id', isAdmin, multer(multerConfig).single('file'), ProductController.updateOne)
router.delete('/:id', isAdmin, ProductController.deleteOne)

module.exports = router