const Country = require('../models/country');

exports.getAll = async (req, res) => {
    try {
        const countries = await Country.getAll();
        res.json(countries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const country = await Country.getById(req.params.id);
        res.json(country);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const country = await Country.create(req.body);
        res.status(201).json(country);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const country = await Country.update(req.params.id, req.body);
        res.json(country);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Country.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

