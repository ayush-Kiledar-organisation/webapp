const express = require('express');
const router = express.Router();
const {db} = require('../cred/cred');
const basicAuth = require('../security/auth');
const User = require('../cred/cred').Schema;
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {

    const email = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')[0];

    const user = await User.findOne({ where: { email } });

    if(!user){
        res.status(404).json({ error: "No User of this email found" });
    }

    const obj = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        created_at: user.account_created,
        updated_at: user.account_updated
    }

    res.status(200).json(obj);


}

const createUser = async (req, res) => {
    console.log(req.body);

    if(!req.body.email || req.body.email == "") {
        res.status(400).json({ error: "Email is required" });
        return;
    }

        // const existing = await User.findOne({ where: { email: req.body.email } });

        // if(existing){
        //     res.status(409).json({ error: "Email already taken" });
        //     return;
        // }

        if(!req.body.password || req.body.password == ""){
            res.status(400).json({ error: "Password field shouldn't be empty" });
            return;
        }

        if(!req.body.firstName || req.body.firstName == "") {
            res.status(400).json({ error: "FirstName is required" });
            return;
        }

        if(!req.body.lastName || req.body.lastName == "") {
            res.status(400).json({ error: "LastName is required" });
            return;
        }

        if(req.body.created_at || req.body.updated_at || req.body.id){

            res.status(400).json({ error: "Auto generated fields must not be manipulated" });
            return;
        }



        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const newuser = {
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            created_at: new Date(),
            updated_at: new Date()
        }
    
    
        const user = await User.create(newuser);

        console.log(user);

        const obj = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            created_at: user.account_created,
            updated_at: user.account_updated
        }
    
        res.status(201).json(obj); 

}

const updateUser = async (req, res) => {
    // console.log(req.body);

        const emailid = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')[0];

        const existing = await User.findOne({ where: { email: emailid } });

        if(!existing){
            res.status(409).json({ error: "User not found" });
            return;
        }
        if(req.body.password == ""){
            res.status(400).json({ error: "Password field shouldn't be empty" });
            return;
        }
        var hashedPassword;
        if(req.body.password){hashedPassword = await bcrypt.hash(req.body.password, 8);}

        if(req.body.email) {
            res.status(400).json({ error: "Email not required" });
            return;
        }

        if(req.body.created_at || req.body.updated_at || req.body.id){

            res.status(400).json({ error: "Auto generated fields must not be manipulated" });
            return;
        }

        const newuser = {
            email: existing.email,
            password: req.body.password ? hashedPassword: existing.password,
            firstName: req.body.firstName ? req.body.firstName: existing.firstName,
            lastName: req.body.lastName ? req.body.lastName: existing.lastName,
            created_at: existing.created_at,
            updated_at: new Date()
        }
    
    
        const user = await User.update(newuser, {where: {email: emailid}});
        // console.log(user);
        const updated = await User.findOne({ where: { email: emailid } });

        const obj = {
            id: updated.id,
            email: updated.email,
            firstName: updated.firstName,
            lastName: updated.lastName,
            created_at: updated.account_created,
            updated_at: updated.account_updated
        }
    
        res.status(200).json(obj);

}

module.exports = {
    getUser,
    createUser,
    updateUser
}