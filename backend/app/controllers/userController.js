const User = require('../models/user');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
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
        // Cek apakah username sudah ada
        const existingUsername = await User.getByUsername(username);
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Cek apakah email sudah ada
        const existingEmail = await User.getByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Jika validasi berhasil, hash password dan buat user baru
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
            return res.status(404).json({ message: "User not found" });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user.user_id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token kadaluarsa setelah 1 jam
            );

            // Simpan token di HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,  // Tidak dapat diakses dari JavaScript
                secure: false,
                sameSite: 'Strict', // Mencegah serangan CSRF
                maxAge: 3600000, // Token berlaku selama 1 jam
            });

            return res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: new Date(0), // Kadaluarsa langsung
    });
    return res.status(200).json({ message: "Logged out successfully" });
};

exports.getProfile = async (req, res) => {
    try {
        // Mendapatkan token dari cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        // Memverifikasi token JWT secara asinkron menggunakan promisify
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Mendapatkan user berdasarkan ID yang terdekode dari token
        const user = await User.getById(decoded.user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mengirimkan data user sebagai profil
        return res.status(200).json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        // Cek apakah error disebabkan oleh token yang tidak valid
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }

        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Error fetching profile", error });
    }
};