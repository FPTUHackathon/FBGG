var mongo_client = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/data_fbgg";
var autoIncrement = require("mongodb-autoincrement");

var name_collection = "user";

exports.createCollection = function(){	
	mongo_client.connect(url,function(err,db){
		if (err) throw err;
		db.createCollection(name_collection,function(err,result){
			if (err) throw err;
			console.log("collection " + name_collection);
			db.close();
		});		
	});
	
};

exports.addCollection = function(data){
	mongo_client.connect(url,function(err,db){
				if (err) throw err;
				autoIncrement.getNextSequence(db, name_collection, function (err, autoIndex) {
			        var collection = db.collection(name_collection);
			        collection.insert({
			            _id: autoIndex,
			            name:data.name,
			            nickName:data.nickName,
			            mail:data.mail,
			            phone:data.phone,
			            password:data.password,
						address:data.address,
						avatar:"",
			            ratting:0
			        });
			        console.log("inserted collection "+ name_collection);
			    });
			});
};

exports.find = function(data){	
	return mongo_client.connect(url).then(function(db) {
      var collection = db.collection(name_collection);
      
      return collection.find(data).toArray();
    }).then(function(items) {
      return items;
    });
};

exports.deleted = function(data){
	mongo_client.connect(url,function(err,db){
		if (err) throw err;
		db.collection(name_collection).deleteOne(data,function(err,result){
			if (err) throw err;
			console.log("deleted"+ result.result.n);
			db.close();
		});
	});
};

exports.dropCollection = function(){
	mongo_client.connect(url,function(err,db){
		if (err) throw err;
		db.collection(name_collection).drop(function(err,result){
			if (err) throw err;
			console.log("drop collection"+ name_collection);
			db.close();
		});
	});
};

exports.update = function(data_age,data_new){
	mongo_client.connect(url,function(err,db){
		if (err) throw err;		
		db.collection("user").updateOne(data_age,data_new,function(err,result){
			if (err) throw err;
			console.log("updated");
			db.close()
		});
	});
};