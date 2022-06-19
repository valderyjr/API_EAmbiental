const router = require('express').Router()
const UserController = require('../../controllers/User')
const multer = require('multer')
const multerConfig = require('../../config/multer')

router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)
// router.post('/', multer(multerConfig).single('file'), UserController.register)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.put('/:id', multer(multerConfig).single('file'), UserController.updateOne)
router.put('/:id', UserController.updateOne)
router.delete('/:id', UserController.deleteOne)

module.exports = router