const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.get('/', countryController.getAll); // Get All Countries
router.get('/:id', countryController.getById);
router.post('/', countryController.create);
router.put('/:id', countryController.update);
router.delete('/:id', countryController.delete);

router.get('/', (req, res) => {
    // Logika untuk mendapatkan data negara
    res.send('List of countries');
});

module.exports = router;

