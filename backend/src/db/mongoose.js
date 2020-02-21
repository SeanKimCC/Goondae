const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect('mongodb://okus9058:'+process.env.SECRET_KEY+'@ds221435.mlab.com:21435/goondae', {
// mongoose.connect('mongodb+srv://okus9058:1DqgQg5Or9mZbyaC@goondae-okhw9.gcp.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});



// const someTask = new Task({
// 	description: ' just some task1  ',
// 	// completed: false
// });

// someTask.save().then(()=>{
// 	console.log(someTask);
// }).catch((error)=>{
// 	console.log(error);
// });