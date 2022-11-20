const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordHash = require('../middleware/passwordHash');


router
.post('/signup', passwordHash, async (req, res) => {
    try { 
        if(!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({status:400, message:"Please make sure to provide a name, an email and a password"})
        }          
        const emailExists = await knex("user").where({email: req.body.email})

        if (emailExists.length === 0) {
            return res.status(409).json({status: 409, message: "We found a conflict. An account under this email already exists"})
        }

        const result = await knex("user").insert( {email:req.body.email, name:req.body.name, password:req.body.password })
        
        return res.status(200).json({ message: "Account successfully created" });
    }
    catch (err) {
        res.status(500).json({message:"There was an error with the database", error: err})
    }
})
.post("/login",  async (req, res) => {
    
    const { email, password } = req.body
    
    if (!email || !password){
       return res.status(400).json({error:"Login requires username and password fields"})
    }
  
    const foundUsers = await knex
                            .select("*")
                            .from("user")
                            .where({email: email})

    if (foundUsers.length === 0) {
        return res.status(401).json({error:"invalid login credentials"})
    }

    const user = foundUsers[0]
    let passwordIsValid = false; 
    try {
       passwordIsValid = await bcrypt.compare(password, user.password)
    }
    catch{
        return res.status(500).json({error:"server error"})
    }
    if(!passwordIsValid){
        return res.status(401).json({error:"incorrect password"})
    }
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET_KEY);
    res.json({ message: "Successfully logged in", token: token })
})


module.exports = router;