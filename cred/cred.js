const {Sequelize} = require('sequelize');
require('dotenv').config();
const User = require('../model/User');

const password = ${{secrets.pass}} || '';

const credentials = new Sequelize(


    'cloud_assignment_db',

    'root', 
    password,{
    host: '127.0.0.1',

    dialect: 'mysql',
    logging: false
    });

const Schema = credentials.define('user',User);
    
const db = {
    sequelize: credentials,
    Sequelize: Sequelize,
    Users: Schema
}


module.exports = {
    credentials,
    db,
    Schema
}

// djnejnej
