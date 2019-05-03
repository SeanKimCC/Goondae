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
	
	db.collection('users').insertOne({
		name: 'Jane',
		age: 30,
		gender: 'Female'
	}, (error, result) => {
		if(error){
			return console.log("Unable to insert user");
		}

		console.log(result.ops);
	});
	
	// db.collection('users').insertMany([
	
	// 	{
	// 		name: 'SK',
	// 		age :23
	// 	}, {
	// 		name: 'Jane',
	// 		age :24
	// 	}
	// ], (error, result) => {
	// 	if(error){
	// 		return console.log("error");
	// 	}
	// 	console.log(result.ops);
	// });
	
	
		
});