const Award = require('../models/award');

exports.getAllAwards = async (req, res) => {
    try {
        const awards = await Award.getAll();
        res.json(awards);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAwardById = async (req, res) => {
    try {
        const award = await Award.getById(req.params.id);
        res.json(award);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.createAward = async (req, res) => {
    try {
        const award = await Award.create(req.body);
        res.status(201).json(award);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateAward = async (req, res) => {
    try {
        const award = await Award.update(req.params.id, req.body);
        res.json(award);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteAward = async (req, res) => {
    try {
        const result = await Award.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
