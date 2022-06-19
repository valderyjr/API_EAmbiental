const router = require('express').Router()
const UserController = require('../../controllers/User')
const multer = require('multer')
const multerConfig = require('../../config/multer')
const {isAuth, isAdmin} = require('../../middlewares/auth')

router.get('/', isAuth, isAdmin, UserController.getAll)
router.get('/:id', isAuth, isAdmin,UserController.getOne)
router.post('/login', UserController.login)
router.post('/register', multer(multerConfig).single('file'), UserController.register)
router.put('/:id', isAuth, isAdmin, multer(multerConfig).single('file'), UserController.updateOne)
router.delete('/:id', isAuth, isAdmin, UserController.deleteOne)

module.exports = router