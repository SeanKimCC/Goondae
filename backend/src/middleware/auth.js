const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next)=>{
	try {
		console.log("this is auth.js", req.params.token);
		let token;
		if(req.body.token){ //these if statements are different ways of receiving token. req.body if a post request, req.params if a get request
			
			token = req.body.token;
		} else if(req.params.token){
			token = req.params.token;
		} else {
			token = req.header('Authorization').replace('Bearer ', '');
		}
		console.log(token);
		const decoded = jwt.verify(token, 'thisismynewcourse');
		console.log(decoded._id, "auth.js");
		user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
		console.log(user);
		if(!user){
			throw new Error('No user found');
		}
		
		req.token = token;
		req.user = user;
		next();
	} catch(e){
		res.status(401).send({ error: 'Please authenticate.' });	
	}
	
	
};

module.exports = auth;