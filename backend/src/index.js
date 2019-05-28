const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const User = require('./models/user');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const auth = require('./middleware/auth');

const app= express();
const port = process.env.PORT || 5000;


// const multer = require('multer');
// const upload = multer({
// 	dest: 'images',
// 	limits: {
// 		fileSize: 1000000
// 	},
// 	fileFilter(req,file,cb){
// 		// if(!file.originalname.endsWith('.pdf')){
// 		// 	return cb(new Error('File must be a PDF'));
// 		// }
		
// 		if(!file.originalname.match(/\.(doc|docx)$/)){
// 			return cb(new Error('File must be a document'));
// 		}
// 		cb(undefined, true);
		
		
// 		// cb(new Error('File must be a PDF'));
// 		// cb(undefined, true);
// 		// cb(undefined, false);
// 	}
// });



// app.use((req, res, next)=>{
// 	if(req.method == 'GET'){
// 		res.send('GET requests are disabled');
// 	} else {
// 		next();
// 	}
// });

// app.use((req, res, next) => {
// 	res.status(503).send('The site is under maintenance');
// });
app.use('/auth', auth);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



//
// Without middleware:	new request -> run route handler
//
// With middleware: 	new request -> do something -> run route handler
//


app.listen(port, () => {
	console.log('Server is up on port : ' + port);
});

const main = async () => {
	// const task = await Task.findById('5cb2fce2f3734f02d4cc9001');
	// await task.populate('owner').execPopulate();
	// console.log(task.owner);
	
	// const user = await User.findById('5cb28065a15f5204addb73d4');
	
	// await user.populate('tasks').execPopulate();
	
	// console.log(user.tasks);
};

main();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const myFunc = async() => {
// 	// const password = "hello123!";
// 	// const hashedPassword = await bcrypt.hash(password, 8); //the second parameter represents how many times we want hashing to run. 8 is the recommended value by the dev. Fewer makes it easier to decrypt, greater makes it slow.
// 	// //hashing is irreversible where as encryption is

// 	// console.log(password);
// 	// console.log(hashedPassword);
	
// 	// const isMatch = await bcrypt.compare('hello123!', hashedPassword);
// 	// console.log(isMatch);
// 	const token = jwt.sign({ _id : 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
	
// 	const data = jwt.verify(token, 'thisismynewcourse');
// 	console.log(data);
	
// };

// myFunc();
