const express = require('express');
const router = express.Router();
const awardController = require('../controllers/awardController');

router.get('/', awardController.getAllAwards);
router.get('/:id', awardController.getAwardById);
router.post('/', awardController.createAward);
router.put('/:id', awardController.updateAward);
router.delete('/:id', awardController.deleteAward);

module.exports = router;