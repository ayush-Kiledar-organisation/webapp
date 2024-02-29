const {Sequelize} = require('sequelize');
require('dotenv').config();
const User = require('../model/User');

// const connector = new Connector();
// const clientOpts = await connector.getOptions({
//     instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
//     authType: 'IAM'
// });

const credentials = new Sequelize(

    process.env.database,
    process.env.username, 
    process.env.password,{

        host: process.env.host,
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
