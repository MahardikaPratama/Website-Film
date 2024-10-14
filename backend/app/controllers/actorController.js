const Actor = require('../models/actor');

exports.getAll = async (req, res) => {
    try {
        const actors = await Actor.getAll();
        res.json(actors);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const actor = await Actor.getById(req.params.id);
        res.json(actor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getByMovie = async (req, res) => {
    try {
        const actors = await Actor.getByMovie(req.params.movie_id);
        res.json(actors);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const actor = await Actor.create(req.body);
        res.status(201).json(actor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const actor = await Actor.update(req.params.id, req.body);
        res.json(actor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Actor.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};