const express = require('express');


const setupRedis = require('./setup/redis');
const setupRouter = require('./setup/router');
const setupMiddleware = require('./setup/middleware');
const setupDatabase = require('./setup/database');


const app = express();

setupMiddleware(app);

async function start() {
    const db = await setupDatabase();
    const redisDb = await setupRedis();
    setupRouter(app, db, redisDb);

    app.listen(4000, () => {
        console.log('Listening on port 4000');
    });
}


start().catch(console.error);