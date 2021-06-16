const express = require('express');
const setupRouter = require('./setup/router');
const setupMiddleware = require('./setup/middleware');
const setupDatabase = require('./setup/database');

const app = express();

setupMiddleware(app);

async function start() {
    const db = await setupDatabase();
    setupRouter(app, db);

    app.listen(4000, () => {
        console.log('Listening on port 4000');
    });
}


start().catch(console.error);