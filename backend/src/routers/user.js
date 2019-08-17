const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const multer = require('multer');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const sharp = require('sharp');
const avatar = multer({
	// dest:'avatar',
	limits : {
		fileSize: 1000000,
		
	},
	fileFilter(req, file, cb){
		if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
			return cb(new Error('File must be an image'));
		}
		cb(undefined, true);
	}
});

//ALLOWING ACCESS ORIGIN
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://goondae-alfpy.run.goorm.io");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

// router.get('/*', auth, async(req, res) => {
	
// });

router.post('/users', async (req, res) => {
	
	const user = new User(req.body);
	
	// user.save().then(() => {
	// 	res.status(201).send(user);
	// }).catch((e)=>{
	// 	res.status(400).send(e);
	// });
	console.log(user);
	try{
		const checkUser = await User.findOne({'email': req.body.email});
		console.log("hello"+ checkUser);
		if(checkUser){
			return res.status(406).send({error: 'Existing email'});
		}
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({user, token});
	} catch(e){
		res.status(400).send(e);
		console.log(e);
	}
	
});

router.post('/users/login', async (req,res) => {
	try {
		
		
		// const user = await User.findByCredentials(req.body.email, req.body.password);
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({user, token});
		
		
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});

router.post('/users/logout', auth, async(req,res)=>{
	console.log("logout token ", req.body.token);
	const token = req.body.token;
	try{
		req.user.tokens = req.user.tokens.filter((token)=>{
			// return token.token !== req.token;
			return token.token !== token;
		});
		await req.user.save();
		res.send(req.user);
	}catch(e){
		res.status(500).send();
	}
});

router.post('/users/logoutAll', auth, async(req,res)=>{
	try{
		req.user.tokens = [];
		await req.user.save();
		res.send(user);
	}catch(e){
		res.status(500).send(e);
	}
});

router.get('/users', async(req,res) => {
	// console.log("cookies", req.cookies['token']);
	console.log("cookies", req.cookies);
	try{
		const users = await User.find();
		res.send(users);
	} catch(e){
		res.status(400).send(e);
	}
 	
});

router.get('/users/me/:token', auth, async (req, res) => {
	res.send(req.user);
});

router.get('/users/:id', async (req, res)=>{
	
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		console.log(user);
		if(!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch(e) {
		res.status(500).send(e);	
	}

});


router.patch('/users/me', auth, async(req, res) => {
	console.log(req.body);
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age', 'mealUnit'];
	
	const isValidOperation = updates.every((update) => (update==="token" || allowedUpdates.includes(update)));
	console.log(isValidOperation);
	
	if(!isValidOperation){
		return res.status(400).send({error: 'Invalid updates!'});
	}
	
	// const _id = req.params.id;
	
	try{
		
		// const user = await User.findById(_id);
		updates.forEach((update) => req.user[update] = req.body[update]);
		await req.user.save();
		
		// const user = await User.findByIdAndUpdate(_id, req.body, { new: true , runValidators: true}); 
		// setting new to true will return the updated user instead of the originally found user.
		
		// if(!user){
		// 	return res.status(404).send();
		// }
		res.send(req.user);
		
	}catch(e){
		res.status(500).send(e);
	}
});

router.delete('/users/me', auth, async(req,res)=>{
	// const _id = req.params.id;
	
	try{
		// const user = await User.findByIdAndDelete(req.user._id);
		
		// if(!user){
		// 	return res.status(404).send();
		// }
		
		await req.user.remove(); //equivalent
		res.send(req.user);
		
	}catch(e){
		res.status(500).send(e);
	}
});

router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req,res)=>{
	
	const buffer = await sharp(req.file.buffer).resize({
		width: 250,
		height: 250
	}).png().toBuffer();
	
	req.user.avatar = buffer;
	// req.user.avatar = req.file.buffer;
	await req.user.save();
	res.status(200).send();
}, (error,req,res,next) => {
	res.status(404).send({error: error.message});
});

router.delete('/users/me/avatar', auth, async(req, res)=>{
	req.user.avatar = undefined;
	await req.user.save();
	res.status(200).send();
});

router.get('/users/:id/avatar', async(req, res)=>{
	try {
		const user = await User.findById(req.params.id);
		
		if(!user || !user.avatar){
		   throw new Error();
		}
		
		res.set('Content-Type', 'image/jpg');
		res.send(user.avatar);
		
	} catch(e){
		res.status(404).send();
	}
});

module.exports = router;