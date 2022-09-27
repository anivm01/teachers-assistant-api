const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5050;
const userRoutes = require("./routes/userRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/pdf", pdfRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});