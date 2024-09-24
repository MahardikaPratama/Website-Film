const Genre = require('../models/genre');

exports.getAll = async (req, res) => {
    try {
        const genre = await Genre.getAll();
        res.json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const genre = await Genre.getById(req.params.id);
        res.json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const genre = await Genre.update(req.params.id, req.body);
        res.json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Genre.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
