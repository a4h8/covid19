var express = require("express");
var app = express();

var path = require("path");

app.set("port", 3000);

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));

// app.get('/', function(req, res) {
//     res.
//         status(200).send('It Works fine');
// });

var server = app.listen(app.get("port"), function() {
  var port = server.address().port;
  console.log("Magic happening on port " + port);
});
