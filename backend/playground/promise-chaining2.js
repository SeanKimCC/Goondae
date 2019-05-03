require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.find().then((tasks) => {
// 	console.log(tasks);
// });

// Task.findByIdAndDelete('someid').then((task)=>{
// 	console.log(task);
// 	return Task.countDocuments({completed: false});
// }).then((tasks)=>{
// 	console.log(tasks);
// }).catch((e)=>{
// 	console.log(e);
// });

const deleteById = async(id) => {
	const user = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({completed : false});
	return count;
};

deleteById("5ca42f4bfda24f04eab60780").then((count) => {
	console.log(count);
}).catch((e) => {
	console.log(e);
});