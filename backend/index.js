var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var port = 3000;
var http = require('http');
var url = require('url');
var fs = require('fs');

app.use(express.static("public"));
app.use(cors());
app.options('*',cors());
app.set("view engine","ejs");
app.set("views","./views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var upload = require("express-fileupload");
app.use(upload());

var server = require("http").Server(app);

server.listen(port,"0.0.0.0",function(){
	console.log("connection port: " + port);
});

app.get('/upload/:filename', (req, res) => {
  console.log(req.params.filename);
  fs.readFile("./upload/"+req.params.filename,function(err,data){
    if (err) {
      throw err;
    }
    res.send(data);
  })
});


var router = require("./my_module/router/router.js");
router.routers(app);

var socket = require("./my_module/socket/socket.js");
socket.connectSocket(server,app);