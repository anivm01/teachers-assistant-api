const express = require('express');
const knex = require('knex')(require("../knexfile"));
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


router
.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, 10, async function(err, hash) {
        if (err) {
            return res.status(400).send("error encrypting the password")
        }
        await 
        knex("user")
        .insert( {email:email, name:name, password:hash } )
    })

  res.json({ success: 'true' });
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