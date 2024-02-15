const {Sequelize} = require('sequelize');
require('dotenv').config();
const User = require('../model/User');


const credentials = new Sequelize(
    process.env.MYSQL_DATABASENAME,
    process.env.MYSQL_USERNAME, 
    process.env.MYSQL_ROOT_PASSWORD,{
    host: 'localhost',
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