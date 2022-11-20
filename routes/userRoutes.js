const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const encryptPassword = require('../middleware/encryptPassword');
const validatePassword = require('../middleware/validatePassword')


router
.post('/signup', encryptPassword, async (req, res) => {
    try { 
        if(!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({status:400, message:"Please make sure to provide a name, an email and a password"})
        }          
        const emailExists = await knex("user").where({email: req.body.email})

        if (emailExists.length !== 0) {
            return res.status(409).json({status: 409, message: "We found a conflict. An account under this email already exists"})
        }

        const result = await knex("user").insert( {email:req.body.email, name:req.body.name, password:req.body.password })
        
        return res.status(200).json({ message: "Account successfully created" });
    }
    catch (err) {
        res.status(500).json({message:"There was an error with the database", error: err})
    }
})
.post("/login", validatePassword,  async (req, res) => {
    try{
        const foundUsers = await knex
        .select("user.id")
        .from("user")
        .where({email: req.body.email})

        const token = jwt.sign({ user_id: foundUsers[0] }, process.env.JWT_SECRET_KEY);
        
        res.status(200).json({ message: "Successfully logged in", token: token })
    }
    catch (err) {
        res.status(500).json({message:"There was an error with the server", error: err})
    }
})


module.exports = router;