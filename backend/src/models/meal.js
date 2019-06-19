const mongoose = require('mongoose');
const validator = require('validator');

const dayMealSchema = new mongoose.Schema({
	date : {
		type: Date,
		required: true
	},
	breakfast:{
		type: String,
		required: true,
		trim: true
	},
	lunch: {
		type: String,
		required: true,
		trim: true		
	},
	dinner: {
		type: String,
		required: true,
		trim: true		
	},
	dessert: {
		type: String,
		required: true,
		trim: true		
	}
	
});

const mealScheduleSchema = new mongoose.Schema({
	currentMonth : {
		type: Integer,
		required: true
	},
	meals : [dayMealSchema]
});

const MealSchedule = mongoose.model('MealSchedule', mealScheduleSchema);


module.exports = MealSchedule;
