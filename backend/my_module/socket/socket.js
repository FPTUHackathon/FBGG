exports.connectSocket = function(server,app){
	var jwt = require("jsonwebtoken");
	var io = require("socket.io")(server);
	var mongo_client = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/data_fbgg";
	var autoIncrement = require("mongodb-autoincrement");

	var follower = require("../database/follower");
	follower.createCollection();
	var post = require("../database/post");
	post.createCollection();
	var topic = require("../database/topic");
	topic.createCollection();
	var user = require("../database/user");
	user.createCollection();
	var user_comment_post = require("../database/user_comment_post");
	user_comment_post.createCollection();
	var user_topic = require("../database/use_topic");
	user_topic.createCollection();
	var msg_2 = require("../database/msg_2");
	msg_2.createCollection();
	var msg_group = require("../database/msg_group");
	msg_group.createCollection();
	

	io.on("connection",function(socket){
		console.log("connected socket: " + socket.id);
		//dang ki

		socket.on("register",function(data){
			user.find({mail: data.mail}).then(function(items) {
			  if (items.length == 0) {
			  	
			  	mongo_client.connect(url,function(err,db){
					if (err) throw err;
					autoIncrement.getNextSequence(db, "user", function (err, autoIndex) {
				        var collection = db.collection("user");
				        dt_inssert = {
				            _id: autoIndex,
				            name:data.name,
				            nickName:data.nickName,
				            mail:data.mail,
				            phone:data.phone,
				            password:data.password,
							address:data.address,
							avatar:"",
							ratting:0,
							created_at:"",
							updated_at:""
				        };				       
				        collection.insert(dt_inssert);

				        var token = jwt.sign(dt_inssert, 'FBGGJWTToken',{
					          expiresIn: '3d' // expires in 3 day
					        });
						//server send tokken	
			  			socket.emit("register_res",{token:token});

				        console.log("inserted collection "+ "user");
				    });
				});

			  }else {
			  	socket.emit("register_res",{msg:"that_bai"});
			  }
			});
		});
		var decoded_token;
		// receiver token
		socket.on("req_send_token",function(data){
			jwt.verify(data.token,'FBGGJWTToken',function(err,decoded){
				decoded_token = decoded;
			});			
		});
		// get user
		socket.on("req_get_user",function(data){
			user.find({_id:data._id}).then(function(items){
				socket.emit("server_send_info_user",items[0]);
			})
		})
		// send all post 
		socket.on("req_send_all_post",function(data){
			mongo_client.connect(url,function(err,db){
				db.collection("post").find().sort({_id:-1}).toArray(function(err, result) {
					if (err) throw err;
					console.log("send all post");
					socket.emit("server_send_all_post",result);
					db.close();
				  });
			});
		});
		//send all post about topic
		socket.on("req_send_all_post_about_topic",function(data){
			post.find({topic_name:data.topic_name}).then(function(items){
				socket.emit("server_send_all_post_about_topic",items)
			});
		});
		// send post and comment limit 5
		
		mongo_client.connect(url, function(err, db) {
			if (err) throw err;
			db.collection("post").find().sort({_id:-1}).limit(5).toArray(function(err, result) {
			  if (err) throw err;
			  for(let i in result){
				//   console.log(result[i]);
				var user_post;
					user.find({_id:result[i].user_id}).then(function(items){
		
						db.collection("user_comment_post").find({post_id:result[i]._id}).sort({_id:-1}).limit(2).toArray(function(err,res){
							if (err) {
								throw err;
							}
							var data = {
								post: result[i],
								comment:res,
								user_post:items[0]
							};
							socket.emit("server_send_post_and_comment",data);			
							
							});
		
					});
				  
				}
				
			});
		  });
		
		// send post new
		app.post("/api/post",function(req,res){
			  if (req.files) {
					filename = req.files.documentFile.name;
					console.log(req.files.documentFile);
					req.files.documentFile.mv("./upload/"+filename,function(err){
						if (err) throw err;
					});
			  }

			  mongo_client.connect(url, function(err, db) {
				if (err) throw err;
				var documentLink;
				var myobj = {
					title:req.body.title,
					description:req.body.description,
					documentLink:req.body.documentLink,
					referDocuments:req.body.referDocuments,
					user_id:Number(req.body.user_id),
					topic_name:req.body.topic_name,
					author:req.body.author || '',
					linkShare:req.body.linkShare || '',
					type:req.body.type || '',
					like:0,
					pin:0,
					share:0,
					report:0,
					created_at:req.body.created_at,
					updated_at:req.body.updated_at
				};
				if (req.files && req.files.documentFile) {
					myobj.documentFile = "/upload/" + req.files.documentFile.name;
				}
				db.collection("post").insertOne(myobj, function(err, res) {
					console.log(myobj);
				  if (err) throw err;
				  console.log("1 document inserted");
				  io.emit("server_send_new_post",myobj);
				  db.close();
				});

				
			  });
		  });
		  
		// send all topic

		topic.find({}).then(function(items){
			socket.emit("server_send_all_topic",items);
		});
		//send topic limit 5
		mongo_client.connect(url, function(err, db) {
			if (err) throw err;
			db.collection("topic").find().sort({_id:-1}).limit(5).toArray(function(err, result) {
			  if (err) throw err;
			  socket.emit("server_send_topic_limit_5",result);
			  db.close();
			});
		  });

		// topic care
		socket.on("req_send_all_topic_care",function(data){
			user_topic.find({user_id:decoded_token._id}).then(function(items){
				socket.emit("server_send_all_topic_care",items);
			});
		});

		socket.on("req_send_new_topic_care",function(data){
			user_topic.addCollection(data);
			socket.emit("server_send_new_topic_care",data);
		});
		
		// post đã đăng
		socket.on("req_send_all_my_post",function(data){
			jwt.verify(data.token,'FBGGJWTToken',function(err,decoded){
				post.find({user_id:decoded._id}).then(function(items){
					console.log(items);
					socket.emit("server_send_all_your_post",items)
				});
			});	
		});
		// new msg 2
		socket.on("req_new_msg",function(data){
			msg_2.addCollection(data);
			io.emit("server_send_msg_new",data);
		});
		// server send all msg 2
		socket.on("req_send_all_msg",function(data){
			mongo_client.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("msg_2").find({user_id_send:data.user_id_send,user_id_receive:data.user_id_receive}).limit(5).toArray(function(err, result) {
				  if (err) throw err;
				  socket.emit("server_send_all_msg_limit_5",result);
				  db.close();
				});
			});
		});
		//get name group
		socket.on("req_send_name_group",function(data){

		});
		// new msg group
		socket.on("req_new_msg_group",function(data){
			msg_group.addCollection(data);
		});
		//server send all msg 
		socket.on("req_send_all_msg_group",function(data){
			mongo_client.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("msg_group").find({user_id_group:data.user_id_group}).limit(5).toArray(function(err, result) {
				  if (err) throw err;
				  socket.emit("server_send_all_msg_limit_5",result);
				  db.close();
				});
			});
		});
	});

	io.on("disconnect",function(){
		console.log("disconnect "+ socket.id);
	});
};