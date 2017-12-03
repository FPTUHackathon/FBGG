// var mongo_client = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/data_fbgg";
// var mang = [];

// mongo_client.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("name_msg_group").drop(function(err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("Collection deleted");
//     db.close();
//   });
// });
 
// mongo_client.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("post").find().toArray(function(err,res){
// 		console.log(res);
// 		db.close();
// 	})
// });
var jwt = require("jsonwebtoken");
var token = jwt.sign({type: 1}, 'FBGGJWTToken',{
  expiresIn: '3d' // expires in 3 day
});


var data = {
  user_id_pay:"2",
  post_id:'5a237178d6cb0f20bcc7dee0',
  token:token
};

var pay = require("./my_module/database/pay");
// pay.dropCollection();
pay.addCollection(data);