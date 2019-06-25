const mongoose = require('mongoose');
const validator = require('validator');

const vacationDateSchema = new mongoose.Schema ({
	vacationTypesAndNumbers: [{
		vacType:{
			type: Number, //0 is 정기, 1 is 포상, 2 is 보상, 3 is 위로, 4 is 병가, 5 is 청원,
			required: true
		},
		vacNum:{
			type: Number,
			required: true
		},
		
	}],
	description:{
		type: String,
		required: false
	},
	completed: {
		type: Boolean,
		default: false
	},
	startDate:{
		type: Date,
		required: true
	},
	numDays:{
		type: Number,
		required: true
	},
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
});

const VacationDate = mongoose.model('VacationDate', vacationDateSchema);


module.exports = VacationDate;
