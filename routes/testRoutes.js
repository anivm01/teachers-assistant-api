const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
   console.log("test happened")
   return res.json({ success: 'test works' });
})

module.exports = router;