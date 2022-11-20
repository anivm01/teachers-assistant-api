const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.use("/uploads", express.static("./uploads"))
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const testRoutes = require("./routes/testRoutes");



app.use("/users", userRoutes);
app.use("/pdf", pdfRoutes);
app.use("/test", testRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});