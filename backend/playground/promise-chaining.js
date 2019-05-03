require('../src/db/mongoose');
const User = require('../src/models/user');

//5c9f6d100fbcf909c58ec252

// User.findByIdAndUpdate("5c9f6d100fbcf909c58ec252", { age:1 }).then((user)=>{
// 	console.log(user);
// 	return User.countDocuments({age : 1});
// }).then((result)=>{
// 	console.log(result);
// }).catch((e)=>{
// 	console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({age});
	console.log(user);
	return count;
};

updateAgeAndCount("5c9f6d100fbcf909c58ec252", 1).then((result) => {
	console.log(result);
}).catch((e) => {
	console.log(e);
});