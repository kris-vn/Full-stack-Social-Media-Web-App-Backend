const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');

router.post('/', commentsController.addComment);
router.get('/:id', commentsController.getAllComments)
router.delete('/:id', commentsController.deleteOneComment)


module.exports = router;