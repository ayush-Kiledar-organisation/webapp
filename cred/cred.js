const {Sequelize} = require('sequelize');
require('dotenv').config();
const User = require('../model/User');


const credentials = new Sequelize(
    process.env.DATABASE, //'dbname',
    process.env.HOSTNAME, //'username',
    process.env.PASSWORD,{ //'password', 
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
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