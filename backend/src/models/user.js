const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email:{
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email is invalid');
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value){
			if(value < 0 ){
				throw new Error('Age must be a positive number');
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value){
			 if(validator.contains(value.toLowerCase(), "password")){
				throw new Error('Password must not contain the string \"password\"');
			}
		}
	},
	tokens: [{
		token:{
			type: String,
			required: true
		}
	}],
	avatar: {
		type: Buffer
	},
	startDate: {
		type: Date
		// required: true
		
		
	}
}, {
	timestamps: true
});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
});

userSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();
	
	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;
	
	return userObject;
};

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user.id.toString() }, 'thisismynewcourse');
	
	user.tokens = user.tokens.concat({ token });
	await user.save();
	
	return token;
	
};

userSchema.statics.findByCredentials = async (email, password) => {
	console.log(email);
	const user = await User.findOne({email});
	console.log(user);
	if(!user){
		throw new Error('Unable to login.');
	}
	
	console.log(user.password, password);
	const isMatch = await bcrypt.compare(password, user.password);
	console.log(isMatch);
	if(!isMatch){
		throw new Error('Unable to login.');
	}
	return user;
	
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
	const user = this;
	
	if(user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	
	next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next){
	const user = this;
	await Task.deleteMany({owner:user._id});
	next();
	
});

const User = mongoose.model('User', userSchema);

module.exports = User;