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
        if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid employee id to find an employee.' });
        }
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

const createEmployee = async (req, res) => {
    try {
        const employee = {
        role: req.body.role,
        employmentType: req.body.employmentType,
        salary: req.body.salary,
        responsibilities: req.body.responsibilities
        };
        const response = await mongodb.getDb().db().collection('employee').insertOne(employee);
        if (response.acknowledged) {
        res.status(201).json(response);
        } else {
        res.status(500).json(response.error || 'Some error occurred while creating the employee.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid employee id to update an employee.' });
        }
        const employeeId = new ObjectId(req.params.id);
        const employee = {
        role: req.body.role,
        employmentType: req.body.employmentType,
        salary: req.body.salary,
        responsibilities: req.body.responsibilities
        };
        const response = await mongodb.getDb().db().collection('employee').replaceOne({ _id: employeeId }, employee);
        if (response.modifiedCount > 0) {
        res.status(204).send();
        } else {
        res.status(500).json(response.error || 'Some error occurred while updating the employee.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid employee id to delete an employee.' });
        }
        const employeeId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('employee').deleteOne({ _id: employeeId });
        if (response.deletedCount > 0) {
        res.status(200).send(response);
        } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the employee.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle, createEmployee, updateEmployee, deleteEmployee };