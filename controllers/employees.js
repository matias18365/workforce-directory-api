const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('employee').find();
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
        const employeeId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('employee').find({ _id: employeeId });
        result.toArray().then((lists) => {
        if (lists.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle };