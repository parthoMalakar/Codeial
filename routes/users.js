const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users _controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), usersController.createSession);

module.exports = router;