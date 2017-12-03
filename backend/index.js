var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var port = 3000;
var http = require('http');
var url = require('url');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var mammoth = require("mammoth");

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

var pay = require("./my_module/database/pay");
pay.createCollection();
app.get('/:user/:post/upload/:filename', (req, res) => {

  var obj = {
    user_id_pay:req.params.user,
    post_id:req.params.post
    
  }

  pay.find(obj).then(function(data){
    if (data.length == 0) {
      res.send('Bạn không đủ quyền để xem tài liệu này');
    } else {
      
      jwt.verify(data[0].token,'FBGGJWTToken',function(err,decoded){
        decoded_token = decoded;
        if (decoded_token.type == 1) {
          fs.readFile("./upload/"+req.params.filename,function(err,data){
            if (err) {
              throw err;
            }
            res.send(data);
          })        
        } else {
          var options = {
            styleMap: [
                "p[style-name='Section Title'] => h1:fresh",
                "p[style-name='Subsection Title'] => h2:fresh",
                "b => strong",
                "i => i",
                "u => u",
                "strike => del",
                "comment-reference => sup"
            ]
          };
          mammoth.convertToHtml({path: "./upload/2.docx"}, options)
            .then(function(result){
                var text = result.value;
                var html = '';
                html += `
                <style>
                body {
                  -webkit-touch-callout: none;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  -o-user-select: none;
                  user-select: none;
                }
                </style>
                `;
                html += `
                <script type=”text/JavaScript”>
                function killCopy(e){
                return false
                }
                function reEnable(){
                return true
                }
                document.onselectstart=new Function (“return false”)
                if (window.sidebar){
                document.onmousedown=killCopy
                document.onclick=reEnable
                }
                </script>
                `;
                res.send(html + text);
                var messages = result.messages;
            })
            .done();
        }
			});
    }
  })

  // console.log(req.params);
  // fs.readFile("./upload/"+req.params.filename,function(err,data){
  //   if (err) {
  //     throw err;
  //   }
  //   res.send(data);
  // })
});


var router = require("./my_module/router/router.js");
router.routers(app);

var socket = require("./my_module/socket/socket.js");
socket.connectSocket(server,app);