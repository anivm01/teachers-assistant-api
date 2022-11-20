const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();
const jwt = require("jsonwebtoken");
const authorize = require('../middleware/authorize');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb)=> {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({storage}).single("file")

router
.get("/", authorize, async (req, res) => {
  
  try {
    const pdfs = await knex
    .select("*")
    .from("pdf")
    .where({ user_id: req.userId });
    if(pdfs.length === 0) {
      return res.status(404).json({status:404, message:"Couldn't find any pdfs for this account"})
    }
    return res.status(200).json(pdfs);
  }

  catch (err) {
    res.status(500).json({message:"There was a problem with the server", error:err})
  }
    
})
.post("/", authorize, (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({message:"Something went wrong with the upload. Try again later"})
      }else{
        const result = await knex("pdf")
        .insert({user_id:req.userId.id, file_name:req.file.filename, file_link:`/uploads/${req.file.filename}`})
        return res.status(200).json({message:"New PDF added"})
      }  
    })
})




module.exports = router;
