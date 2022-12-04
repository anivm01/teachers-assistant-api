const bcrypt = require("bcrypt");
const knex = require('knex')(require("../knexfile"));


module.exports = async (req, res, next) => {
    if (!req.body.email || !req.body.password){
        return res.status(400).json({message:"Login requires username and password fields"})
     }
    try {
        const foundUsers = await knex ('user')
                            .select("*")
                            .where({email: req.body.email})

        if (foundUsers.length === 0) {
            return res.status(401).json({message:"Invalid login credentials"})
        }
        const passwordIsValid = await bcrypt.compare(req.body.password, foundUsers[0].password)
        if(!passwordIsValid){
            return res.status(401).json({message:"Incorrect password"})
        }
    }
    catch (err) {
        return res.status(500).json({message:"There was an error", error: err})
    }
    next();
}