const {Sequelize} = require('sequelize');
require('dotenv').config();
const User = require('../model/User');


const credentials = new Sequelize(


    'cloud_assignment_db',

    'root', 
    'root',{
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
