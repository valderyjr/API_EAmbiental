const router = require('express').Router()
const EcologicalLabelsController = require('../../controllers/EcologicalLabels')
const multer = require('multer')
const multerConfig = require('../../config/multer')
const {isAdmin} = require('../../middlewares/auth')

router.get('/', EcologicalLabelsController.getAll)
router.get('/:id', EcologicalLabelsController.getOne)
router.post('/', isAdmin, multer(multerConfig).single('file'), EcologicalLabelsController.register)
router.put('/:id', isAdmin, multer(multerConfig).single('file'), EcologicalLabelsController.updateOne)
router.delete('/:id', isAdmin, EcologicalLabelsController.deleteOne)

module.exports = router