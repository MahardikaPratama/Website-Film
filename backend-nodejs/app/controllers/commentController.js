const Comment = require('../models/comment');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAll();
        res.json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.getById(req.params.id);
        res.json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.update(req.params.id, req.body);
        res.json(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const result = await Comment.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};