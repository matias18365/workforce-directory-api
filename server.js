const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8080;
const app = express();

// basic middlewares and cors
app.use(cors());
app.use(express.json());

// express session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secretkey',
        resave: false,
        saveUninitialized: true
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Strategy for GitOAuth
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080/github/callback'
        },
        (acessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

//app routes
app.use('/', require('./routes'));

//connection to mongodb
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
        console.log(`Server running on port ${port} and DB is connected`);
        });
    }
});