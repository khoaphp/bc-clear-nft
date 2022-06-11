var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));

var fs = require("fs");
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.io = io;
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');

fs.readFile("./config.json", "utf8", function(err, data){
    if(err){ throw err };
    var obj = JSON.parse(data);
    require("./routes/main")(app, obj);
    /*mongoose.connect('mongodb+srv://'+obj.mongoose.username+':'+obj.mongoose.password+'@'+obj.mongoose.server+'/'+obj.mongoose.dbname+'?retryWrites=true&w=majority', function(err){
        if(err){ throw err; } 
        require("./routes/main")(app, obj);
        console.log("Mongodb connected successfully.");
    });*/
});

