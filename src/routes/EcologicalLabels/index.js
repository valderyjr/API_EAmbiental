const router = require('express').Router()
const EcologicalLabelsController = require('../../controllers/EcologicalLabels')
const multer = require('multer')
const multerConfig = require('../../config/multer')

router.get('/', EcologicalLabelsController.getAll)
router.get('/:id', EcologicalLabelsController.getOne)
router.post('/', multer(multerConfig).single('file'), EcologicalLabelsController.register)
router.put('/:id', multer(multerConfig).single('file'), EcologicalLabelsController.updateOne)
router.delete('/:id', EcologicalLabelsController.deleteOne)

module.exports = router