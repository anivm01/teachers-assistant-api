const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();
const jwt = require("jsonwebtoken");

router
.get("/", (req, res) => {
  const bearerTokenString = req.headers.authorization;

  if (!bearerTokenString) {
    return res
      .status(401)
      .json({
        error: "Resource requires bearer token in authorization header",
      });
  }

  const splitBearerToken = bearerTokenString.split(" ");

  if (splitBearerToken.length !== 2) {
    return res.status(400).json({ error: "Bearer token is malformed" });
  }

  const token = splitBearerToken[1];

    jwt.verify( token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json("token was not decoded correctly");
      } else {
       const userId = decoded.user_id;
        knex
          .select("*")
          .from("pdf")
          .where({user_id:userId})
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((err) => {
            return res.status(500).send("error getting pdf info");
          });
      }
    }
  );
})
// .post("/", (req, res) => {

// })

module.exports = router;
