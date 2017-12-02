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

var data = {
  user_id_group:[2,3,4], // array id
  name_group:"team"
};

var name_msg_group = require("../backend/my_module/database/name_msg_group");
// name_msg_group.addCollection(data);
name_msg_group.find({user_id_group:[2,3]}).then(function(data){
  console.log(data);
})