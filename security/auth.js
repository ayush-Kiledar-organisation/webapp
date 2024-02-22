const express = require('express');
const app = express();
const User = require('../cred/cred').Schema;
const bcrypt = require('bcryptjs');

const authenticated = async (email, password) => {

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return false;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return false;
    }
    return true;
}


const basicAuth = async(req, res, next) => {

    if (!req.get('Authorization')) {
        const err = new Error('Not Authenticated');
        res.status(401).json({ error: "Not Authenticated" });
        return next(err);
      }

      var data = Buffer.from(req.get('Authorization').split(' ')[1], 'base64');
      var [email, password] = data.toString().split(':');
      
    const authenticate = await authenticated(email, password);
    if (!authenticate) {
    const err = new Error('Invalid Credentials');
    res.status(401).json({ error: err.message });
    return next(err);
    }
    next();

}

module.exports = basicAuth;