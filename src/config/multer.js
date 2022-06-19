const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const storageS3 = multerS3({
	s3: new aws.S3(),
	bucket: process.env.BUCKET_NAME,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	acl: 'public-read',
	key: (req, file, cb) => {
		crypto.randomBytes(16, (error, hash) => {
			if (error) cb(error);
			const fileName = `${hash.toString('hex')}-${file.originalname}`

			cb(null, fileName)
		})
	}
})

module.exports = {
	storage: storageS3,
	limits: {
		fileSize: 4 * 1024 * 1024
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = [
			'image/jpg',
			'image/jpeg',
			'image/pjpeg',
			'image/png',
			'image/svg+xml'
		]
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Invalid file type."));
		}
	}
}