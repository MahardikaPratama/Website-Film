const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAll);
router.get('/:id', commentController.getById);
router.post('/', commentController.create);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.delete);

module.exports = router;