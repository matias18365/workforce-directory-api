const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    res.send('Workforce Directory API is running!');
});

router.use('/contacts', require('./contacts'));
router.use('/employees', require('./employees'));

//Route to Login using GitHub
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// 2. Callback route that directs to Github
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/api-docs'); //Redirect to Swagger after login
    }
);

//Route to logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        res.redirect('/api-docs');
    });
});

module.exports = router;