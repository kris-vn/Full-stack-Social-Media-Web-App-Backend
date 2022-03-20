const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const postsController = require('../controllers/posts')

router.get('/', auth, postsController.getAllGifs)
router.post('/', auth, postsController.uploadGif)
router.get('/:id', auth, postsController.getOneGif)
router.put('/:id', auth, postsController.modifyGif)
router.delete('/:id', auth, postsController.deleteOneGif)


module.exports = router