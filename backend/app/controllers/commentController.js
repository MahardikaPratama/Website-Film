const Comment = require('../models/comment');

exports.getAll = async (req, res) => {
    try {
        const comments = await Comment.getAll();
        res.json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const comment = await Comment.getById(req.params.id);
        res.json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByMovie = async (req, res) => {
    try {
        const comments = await Comment.getByMovie(req.params.movie_id);
        res.json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.create = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const comment = await Comment.update(req.params.id, req.body);
        res.json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Comment.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};