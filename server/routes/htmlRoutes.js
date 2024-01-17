// COMMENT: imports path
const path = require("path");

// COMMENT: exports the html routes for the server
module.exports = (app) => app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/dist/index.html")));
