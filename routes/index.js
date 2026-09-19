const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Workforce Directory API is running!');
});

router.use('/contacts', require('./contacts'));
router.use('/employees', require('./employees'));

module.exports = router;