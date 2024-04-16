const express = require('express');
const router = express.Router();
const {db} = require('../cred/cred');
const basicAuth = require('../security/auth');
const { getUser, createUser, updateUser } = require('../controllers/user.controller');
const User = require('../cred/cred').Schema;

router.get('/v10/user/self',basicAuth, getUser);

router.post('/v10/user/self', createUser);

router.put('/v10/user/self', basicAuth, updateUser);

module.exports = router;