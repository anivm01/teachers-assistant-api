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
    const pdfs = await knex
        .select("*")
        .from("pdf")
        .where({ user_id: req.userId });
    res.json(pdfs);
})
.post("/", authorize, (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(error)
      return res.status(500).send("something went wrong")
    }
    
    const newFileName = req.file.filename;
    const splitFileName = newFileName.split("-")
    await knex("pdf")
    .insert({user_id:req.userId, file_name:splitFileName[1], file_link:`http://localhost:5000/uploads/${req.file.filename}`})
    return res.status(200).send("success")
  })
  
})




module.exports = router;
