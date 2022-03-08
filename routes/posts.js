const express = require('express')

const router = express.Router()

const postsController = require('../controllers/posts')

router.get('/', postsController.getAllGifs)
router.post('/', postsController.uploadGif)
router.get('/:id', postsController.getOneGif)
router.put('/:id', postsController.modifyGif)
router.delete('/:id', postsController.deleteOneGif)


module.exports = router