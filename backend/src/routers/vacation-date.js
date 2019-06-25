const express = require('express');
const VacationDate = require('../models/vacation-date');
const auth = require('../middleware/auth');
const router = new express.Router();

function checkIfTwoDateRangesCoincide(date1, numDays1, date2, numDays2){
	return;
}

router.post('/vacationDate', auth, async(req, res) => {
	// const task = new Task(req.body);
	console.log("heelo");
	const vacationDate = new VacationDate({
		...req.body,
		owner: req.user._id
	});
	
	try{
		//find a vacation date that coincides with the one being created
		const findDup = VacationDate.findOne({
			
			owner: req.user._id 
		});
		await vacationDate.save();
		res.status(201).send(vacationDate);
	}catch(e){
		res.status(400).send(e);
	}
	
});

// FILTERING DATA : GET /tasks?completed=true
// PAGINATION : GET /tasks?limit=10&skip=0
// SORTING DATA : GET /tasks?sortBy=createdAt:desc
router.get('/vacationDates', auth, async(req, res) => {
	const match = {};
	const sort = {};
	
	if(req.query.completed){
	   match.completed = req.query.completed === 'true';
	}
	
	if(req.query.sortBy){
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		
	}
	
	try{
		// const tasks = await Task.find({ owner: req.user._id});
		// res.send(tasks);
		
		const vacationDates = await req.user.populate({
			path:'vacationDates',
			match,
			options:{
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			}
		}).execPopulate();
		res.send(req.user.vacationDates);
	}catch(e){
		res.status(500).send(e);
	}
});

router.get('/allVacationDates', auth, async(req, res) => {
	try{
		const vacationDates = await VacationDate.find({});
		res.send(vacationDates);
	}catch(e){
		res.status(500).send(e);
	}
});

router.get('/vacationDates/:id', auth, async(req, res) => {
	const _id = req.params.id;
	
	try{
		const vacationDate = await VacationDate.findOne({ _id, owner: req.user._id });
		if(!vacationDate){
			return res.status(404).send();
		}
		res.send(vacationDate);
	}catch(e){
		res.status(500).send(e);
	}
});

router.patch('/vacationDates/:id', auth, async(req,res)=>{
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed', 'startDate', 'endDate', 'vacationTypesAndNumbers'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
	
	const _id = req.params.id;
	
	if(!isValidOperation){
		return res.status(400).send();
	}
	
	try{
		// const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators : true});
		const vacationDate = await VacationDate.findOne({_id, owner: req.user._id});
		
		if(!vacationDate) {
			return res.status(404).send("Error: no task found");
		}
		
		updates.forEach((update)=> vacationDate[update] = req.body[update]);
		await vacationDate.save();
		res.send(vacationDate);
		
	}catch(e){
		res.status(500).send(e);
	}
	
});

router.delete('/vacationDates/:id', auth, async(req, res) => {
	const _id = req.params.id;
	
	try{
		const vacationDate = await VacationDate.findOneAndDelete({_id, owner: req.user._id});
		if(!vacationDate){
			return res.status(404).send();
		}
		res.send(vacationDate);
	} catch(e){
		res.status(500).send(e);
	}
});

module.exports=router;