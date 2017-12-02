var user = require("../database/user");
var topic = require("../database/topic");
var jwt = require("jsonwebtoken");

exports.routers = function(app){
	app.get("/home",function(req,res){
		res.render("home");
	})
	var obj_login;
		app.post("/api/login",function(req,res){
			obj_login = {
				mail:req.body.mail,
				password:req.body.password
			};
			console.log("obj_login");
			user.find(obj_login).then(function(items){
				if (items.length == 0) {
			  		res.status(401).json({msg:"that bai"});
				}else {
				  	var token = jwt.sign({
				  		_id:items[0]._id,
			            name:items[0].name,
			            nickName:items[0].nickName,
			            mail:items[0].mail,
			            phone:items[0].phone,
			            address:items[0].address,
			            ratting:items[0].ratting
				  	}, 'FBGGJWTToken',{
				          expiresIn: '3d' // expires in 3 day
				        });
				  	return res.json({token: token});
				}	
			})
		});

		app.get("/api/topic",function(req,res){
			topic.find({}).then(function(items){
				res.json({topics:items});
			});
		})
	
}