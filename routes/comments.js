const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const commentsController = require('../controllers/comments');

router.post('/', auth, commentsController.addComment);
router.get('/:id', auth, commentsController.getAllComments)
router.delete('/:id', auth, commentsController.deleteOneComment)


module.exports = router;