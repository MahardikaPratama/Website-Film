const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll); // Mendapatkan semua user
router.get('/:id', userController.getById); // Mendapatkan user berdasarkan ID
router.get('/email/:email', userController.getByEmail); // Mendapatkan user berdasarkan email
router.post('/', userController.create); // Membuat user baru
router.put('/:id', userController.update); // Mengupdate user
router.delete('/:id', userController.deleteUsers); // Menghapus user
router.post('/register', userController.register); // Register user
router.post('/login', userController.login); // Login user

module.exports = router;
