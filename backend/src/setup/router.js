const Router = require('express').Router;

const getPoll = require('../handlers/get-poll');
const createPolls = require('../handlers/create-polls');
const createVotes = require('../handlers/create-votes');
const getMyPolls = require('../handlers/get-my-polls');

const createPollsValidator = require('../validators/create-polls');
const createVotesValidator = require('../validators/create-votes');

const createUser = require('../authentication/create-user');
const signinUser = require('../authentication/signin-user');

const createUserValidator = require('../validators/create-user');
const signinUserValidator = require('../validators/login');

const isAuth = require('../authentication/is-auth');

module.exports = (app, db, redisDb) => {
    const router = new Router();

    router.post('/polls', isAuth, createPollsValidator, createPolls(db));

    router.put('/polls/:poll', createVotesValidator, createVotes(db, redisDb));

    router.get('/polls/:poll', getPoll(db));

    router.post('/signup', createUserValidator, createUser(db));

    router.post('/signin', signinUserValidator, signinUser(db));

    router.get('/my-polls/:userId', getMyPolls(db));

    app.use(router);
}