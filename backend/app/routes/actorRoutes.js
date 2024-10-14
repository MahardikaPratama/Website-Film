const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.get('/', actorController.getAll);
router.get('/:id', actorController.getById);
router.get('/movie/:movie_id', actorController.getByMovie);
router.post('/', actorController.create);
router.put('/:id', actorController.update);
router.delete('/:id', actorController.delete);

module.exports = router;