const {Sequelize} = require('sequelize');
const express = require('express');
const app = express();
const {db} = require('./cred/cred');
const User = require('./cred/cred').Schema;
const bcrypt = require('bcryptjs');
const basicAuth = require('./security/auth');
const body_parser = require('body-parser');
const router = require('./routes');

app.use(body_parser.json());
db.sequelize.sync();

app.use(router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

module.exports = app;