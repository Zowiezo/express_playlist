const path = require("path");
const express = require("express");
const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api routes
app.use("/", require("./routes/playlist"));

const PORT = 3090;

app.listen(PORT, console.log(`Server running on port: ${PORT}`));