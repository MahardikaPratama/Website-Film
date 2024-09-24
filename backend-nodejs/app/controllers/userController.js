const User = require('../models/user');

exports.getAll = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const user = await User.update(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await User.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};