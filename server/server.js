// COMMENT: imports express
const express = require("express");

// COMMENT: creates an instance of express
const app = express();

// COMMENT: sets the port to 3000 or the environment port
const PORT = process.env.PORT || 3000;

// COMMENT: sets up express to handle data parsing
app.use(express.static("../client/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// COMMENT:  sets up the routes for the server
require("./routes/htmlRoutes")(app);

// COMMENT:  starts the server, logs the port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
