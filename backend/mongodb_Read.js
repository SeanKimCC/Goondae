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
	
	// db.collection('users').findOne({ _id: new ObjectID("5c8cc3a2a59bf810271505d6")}, (error, user) => {
	// 	if(error) {
	// 		return console.log('Unable to fetch');
	// 	}
		
	// 	console.log(user);
	// });
	
	// db.collection('users').find({ name: 'Jane'}).toArray((error, users) => {
	// 	console.log(users);
	// });
	
	// db.collection('users').find({ name: 'Jane'}).count((error, count) => {
	// 	console.log(count);
	// });
	
	// db.collection('tasks').findOne({completed:true}, (error, task) => {
	// 	if(error){
	// 		return console.log("E");
	// 	}
	// 	console.log(task);
	// });
	db.collection('users').find().toArray((error, users) => {
		if(error){
			return console.log("E");
		}
		console.log(users);
	});
	
	db.collection('tasks').find({completed:true}).toArray((error, tasks) => {
		if(error){
			return console.log("E");
		}
		console.log(tasks);
	});
	
		
});