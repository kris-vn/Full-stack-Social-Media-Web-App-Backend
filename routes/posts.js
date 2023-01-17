const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postsController = require('../controllers/posts')

router.get('/', auth, postsController.getAllPosts)
router.post('/', auth, postsController.uploadGif)
router.get('/:id', auth, postsController.getOneGif)
router.put('/:id', auth, postsController.modifyGif)
router.delete('/:id', auth, postsController.deleteOneGif)


module.exports = router