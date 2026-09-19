const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('contact').find();
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('contact').find({ _id: userId });
        result.toArray().then((lists) => {
        if (lists.length === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle };