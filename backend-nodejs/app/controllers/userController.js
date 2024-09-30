const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mendapatkan semua user
exports.getAll = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Mendapatkan user berdasarkan ID
exports.getById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Mendapatkan user berdasarkan email
exports.getByEmail = async (req, res) => {
    try {
        const user = await User.getByEmail(req.params.email);
        console.log(user); 
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// Membuat user baru
exports.create = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Mengupdate user
exports.update = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.update(req.params.id, { username, email, password: hashedPassword });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Menghapus user
exports.deleteUsers = async (req, res) => {
    try {
        const result = await User.deleteUsers(req.params.id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

// Registrasi user baru
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.getByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error); // Tambahkan log ini
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

