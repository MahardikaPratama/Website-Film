const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', commentController.getAll);
router.get('/:id', commentController.getById);
router.get('/movie/:movie_id', commentController.getByMovie);
router.post('/', authenticateToken, commentController.create);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.delete);

module.exports = router;