const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
    .use(cors())
    .use(express.json())
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
        console.log(`Server running on port ${port} and DB is connected`);
        });
    }
});