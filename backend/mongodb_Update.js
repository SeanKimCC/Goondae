// CRUD creat read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const dbRoute = "mongodb://okus9058:153486z@ds221435.mlab.com:21435/goondae";
const databaseName = "task-manager";

MongoClient.connect(dbRoute, { useNewUrlParser: true },(error,client) => {

	
	if(error) {
		return console.log("Unable to connect to database!");
	}
	
	const db = client.db('goondae');
	
	// db.collection('users').updateOne({
	// 	_id: new ObjectID("5c8c82a5af3f451a5568bc23")
	// }, {
	// 	$inc: {
	// 		age: 1
	// 	}
	// }).then((result) => {
	// 	console.log(result);
	// }).catch((error)=>{
	// 	console.log(error);
	// });
	
	db.collection('tasks').updateMany({
	},{
		$set:{
			completed:true
		}
	}).then((result) => {
		console.log(result.modifiedCount);
	}).catch((error)=>{
		console.log(error);
	});
		
});