const mongoose = require('mongoose');


mongoose.connect('mongodb://okus9058:153486z@ds221435.mlab.com:21435/goondae', {
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