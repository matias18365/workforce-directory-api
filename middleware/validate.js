const validator = require('validatorjs');

const validatorMiddleware = (body, rules, customMessages, callback) => {
    const validation = new validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const saveContact = (req, res, next) => {
    const validationRules = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        department: 'required|string',
        hireDate: 'required|string',
        address: 'required|string',
        emergencyContact: 'required|string'
    };

    validatorMiddleware(req.body, validationRules, {}, (err, status) => {
        if (!status) {
        res.status(400).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
        } else {
        next();
        }
    });
};

const saveEmployee = (req, res, next) => {
    const validationRules = {
        role: 'required|string',
        employmentType: 'required|string',
        salary: 'required|numeric',
        responsibilities: 'required|string'
    };

    validatorMiddleware(req.body, validationRules, {}, (err, status) => {
        if (!status) {
        res.status(400).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
        } else {
        next();
        }
    });
};

module.exports = { saveContact, saveEmployee };