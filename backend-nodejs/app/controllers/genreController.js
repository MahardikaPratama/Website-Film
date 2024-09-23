const Genre = require('../models/genre');

exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.getAll();
        res.json(genres);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.getById(req.params.id);
        res.json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createGenre = async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const genre = await Genre.update(req.params.id, req.body);
        res.json(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        const result = await Genre.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
