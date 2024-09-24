const express = require('express');
const router = express.Router();
const awardController = require('../controllers/awardController');

router.get('/', awardController.getAll);
router.get('/:id', awardController.getById);
router.post('/', awardController.create);
router.put('/:id', awardController.update);
router.delete('/:id', awardController.delete);

module.exports = router;