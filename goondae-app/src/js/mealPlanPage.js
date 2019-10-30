import React from 'react';
import Select from 'react-select';
import '../css/index.css';
import '../css/font-addition.css';
import '../css/goonbokmu-content.css';
import '../css/meal-plan.css';
import '../css/bootstrap-4.0.0/bootstrap.css';

// var json = require('../json/2019-june-meal.json'); 

class MealPlanPage extends React.Component{
	// constructor(props){
	// 	super(props);
		
	// 	// this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		
	// }
	handleChange(selectedOption) {
		this.props.handleMealUnitChange(selectedOption);
	};
	
	getColorWithDate(date){
		let setDate = new Date(); 
		setDate.setMonth(parseInt(date.substring(0,2))-1);
		setDate.setDate(parseInt(date.substring(3,5)));
		const dayOfDate = setDate.getDay();
		
		if(dayOfDate === 0){ // #FFC0C0 #FFE5E5
			return "sunday-meal-row";
		}else if(dayOfDate === 6){ // #DADAFF
			return "saturday-meal-row";
		} else { // #ECECEC
			return "weekday-meal-row";
		}
		
		
	}
	
	renderSingleItemOfMeal(mealItem, keyName){
		
		return (<div className="type-meal-item" key={keyName}>{mealItem}</div> );
		
	}

	
	renderDayMealRow(mealData, i){
		
		let newMealsArray = [];
		newMealsArray.push(mealData.날짜.split(" "));
		newMealsArray.push(mealData.조식.split(" "));
		newMealsArray.push(mealData.중식.split(" "));
		newMealsArray.push(mealData.석식.split(" "));
		newMealsArray.push(mealData.후식.split(" "));
		
		console.log(newMealsArray);
		
		const keyStringArray = ['dateItem:', 'breakfastItem:', 'lunchItem:', 'dinnerItem:', 'dessertItem:'];
		
		
		let newDayMealStringArray = [];
		for(var k = 0; k < 5; k++){
			let newDayMealString = [];
			for(var j = 0; j < newMealsArray[k].length; j++){
				newDayMealString.push(this.renderSingleItemOfMeal(newMealsArray[k][j], keyStringArray[k] + j));
			}
			newDayMealStringArray.push(newDayMealString);
		}
		const rowClass = "type-meal-row " + this.getColorWithDate(newMealsArray[0][0]);
		return (<div className={rowClass} key={"row"+i}>
					<div className="meal-cell date-meal-cell" key={"date:"+i}>{newDayMealStringArray[0]}</div>
					<div className="meal-cell breakfast-meal-cell" key={"breakfast:"+i}>{newDayMealStringArray[1]}</div>
					<div className="meal-cell lunch-meal-cell" key={"lunch:"+i}>{newDayMealStringArray[2]}</div>
					<div className="meal-cell dinner-meal-cell" key={"dinner:"+i}>{newDayMealStringArray[3]}</div>
					<div className="meal-cell dessert-meal-cell" key={"dessert:"+i}>{newDayMealStringArray[4]}</div>					
				</div>);
		
	}
	
	renderDayMealColumn(mealData, i, isOnMainPage){
		let newMealsArray = [];
		newMealsArray.push(mealData.날짜.split(" "));
		newMealsArray.push(mealData.조식.split(" "));
		newMealsArray.push(mealData.중식.split(" "));
		newMealsArray.push(mealData.석식.split(" "));
		newMealsArray.push(mealData.후식.split(" "));
		
		console.log(isOnMainPage);
		const dateClass = isOnMainPage ? "meal-cell date-meal-cell-mainp" : "meal-cell date-meal-cell";
		const breakfastClass = isOnMainPage ? "meal-cell breakfast-meal-cell-mainp" : "meal-cell breakfast-meal-cell";
		const lunchClass = isOnMainPage ? "meal-cell lunch-meal-cell-mainp" : "meal-cell lunch-meal-cell";
		const dinnerClass = isOnMainPage ? "meal-cell dinner-meal-cell-mainp" : "meal-cell dinner-meal-cell";
		const dessertClass = isOnMainPage ? "meal-cell dessert-meal-cell-mainp" : "meal-cell dessert-meal-cell";
		
		console.log(newMealsArray);
		
		const keyStringArray = ['dateItem:', 'breakfastItem:', 'lunchItem:', 'dinnerItem:', 'dessertItem:'];
		
		
		let newDayMealStringArray = [];
		for(var k = 0; k < 5; k++){
			let newDayMealString = [];
			for(var j = 0; j < newMealsArray[k].length; j++){
				newDayMealString.push(this.renderSingleItemOfMeal(newMealsArray[k][j], keyStringArray[k] + j));
			}
			newDayMealStringArray.push(newDayMealString);
		}
		const rowClass = "type-meal-row " + this.getColorWithDate(newMealsArray[0][0]);
		return (<div className={rowClass} >
					<div className={dateClass} >{newDayMealStringArray[0]}</div>
					<div className={breakfastClass} >{newDayMealStringArray[1]}</div>
					<div className={lunchClass} >{newDayMealStringArray[2]}</div>
					<div className={dinnerClass} >{newDayMealStringArray[3]}</div>
					<div className={dessertClass} >{newDayMealStringArray[4]}</div>					
				</div>);
	}
	
	render() {
		var mealDataJson = require('../json/2019-june-meal.json');
		// const options = [
		// 	{value: 0, label: '육군훈련소'},
		// 	{value: 1, label: '제2급양대'},
		// 	{value: 2, label: '제3급양대'},
		// 	{value: 3, label: '제8급양대'},
		// 	{value: 4, label: '제11급양대'},
		// 	{value: 5, label: '제5급양대'},
		// 	{value: 6, label: '제6176부대'},
		// 	{value: 7, label: '제1691부대'},
		// 	{value: 8, label: '제5322부대'},
		// 	{value: 9, label: '제10급양대'},
		// 	{value: 10, label: '제6335부대'},
		// 	{value: 11, label: '제8623부대'},
		// 	{value: 12, label: '제2171부대'},
		// 	{value: 13, label: '제9030부대'}];
		const options = [
			{value: 0, label: '육군훈련소'},
			{value: 1, label: '제8902부대'},
			{value: 2, label: '제5021부대'},
			{value: 3, label: '제6282부대'},
			{value: 4, label: '제3296부대'},
			{value: 5, label: '제7369부대'},
			{value: 6, label: '제6176부대'},
			{value: 7, label: '제1691부대'},
			{value: 8, label: '제5322부대'},
			{value: 9, label: '제10급양대'},
			{value: 10, label: '제6335부대'},
			{value: 11, label: '제8623부대'},
			{value: 12, label: '제2171부대'},
			{value: 13, label: '제9030부대'}];
		
		const defaultOption = options[this.props.mealUnit];
		const unitName = defaultOption.label;
		const currentUnitMealData = mealDataJson[unitName];
		console.log(mealDataJson, unitName, currentUnitMealData)
		const lastMonthMealData = currentUnitMealData;
		const nextMonthMealData = currentUnitMealData;
		
		
		const mealRows = [];
		var dateClass = "meal-cell date-meal-cell";
		var breakfastClass = "meal-cell breakfast-meal-cell";
		var lunchClass = "meal-cell lunch-meal-cell";
		var dinnerClass = "meal-cell dinner-meal-cell";
		var dessertClass="meal-cell dessert-meal-cell";
		
		if(this.props.isOnMainPage){
			const today = new Date();
			var lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
			lastDayOfNextMonth.setDate(lastDayOfNextMonth.getDate() - 1);
			console.log(today.getDate());
			if(today.getDate() === 1) {
				mealRows.push(this.renderDayMealColumn(lastMonthMealData[-1], -1, true));
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[0], 0, true));
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[1], 1, true));
			} else if(today.getDate() === lastDayOfNextMonth.getDate()){
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[today.getDate()-2], -2, true));
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[today.getDate()-1], -1, true));
				mealRows.push(this.renderDayMealColumn(nextMonthMealData[0], 0, true));
				
			} else {
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[today.getDate()-2], -2, true));
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[today.getDate()-1], -1, true));
				mealRows.push(this.renderDayMealColumn(currentUnitMealData[today.getDate()], 0, true));
			}
			dateClass += "-mainp";
			breakfastClass += "-mainp";
			lunchClass += "-mainp";
			dinnerClass += "-mainp";
			dessertClass += "-mainp";
		} else {
			console.log(currentUnitMealData);
			for(var i = 0; i < currentUnitMealData.length; i++){
				mealRows.push(this.renderDayMealRow(currentUnitMealData[i], i, false));
				// dateCell.push(this.renderMealOfTheDay(currentUnitMealData[i].날짜,"date",i));
				// breakfastCell.push(this.renderMealOfTheDay(currentUnitMealData[i].조식,"breakfast",i));
				// lunchCell.push(this.renderMealOfTheDay(currentUnitMealData[i].중식,"lunch",i));
				// dinnerCell.push(this.renderMealOfTheDay(currentUnitMealData[i].석식,"dinner",i));
				// dessertCell.push(this.renderMealOfTheDay(currentUnitMealData[i].후식,"dessert",i));
			}
		}
		
		
		
		let saveBtnClass = "submit-btn btn ";
		let mealSelectClass = "meal-unit-select";
		if(!localStorage.getItem('token')){
			saveBtnClass += "hidden";
			mealSelectClass += "full-length";
		}
		
		
		
		
// 					<div id="dateCell" className={cellClass}>{dateCell}</div>
// 					<div id="breakfastCell" className={cellClass}>{breakfastCell}</div>
// 					<div id="lunchCell" className={cellClass}>{lunchCell}</div>
// 					<div id="dinnerCell" className={cellClass}>{dinnerCell}</div>
// 					<div id="dessertCell" className={cellClass}>{dessertCell}</div>
		return(
			<div id="mealPlanContainer">
				<div id="mealUnitSelector">
					<form> 
						<Select className={mealSelectClass} options={options} isSearchable={0} onChange= {(i) => this.handleChange(i)} value={defaultOption}/>
						<input className={saveBtnClass} type="button" onClick={this.props.saveMealUnitChange} value="저장"/>
					</form>
					
				</div>
				<div id="mealPlan">
					<div className="type-meal-row type-meal-title-row">
						<div className={dateClass}><div className="type-meal-title">날짜</div></div>
						<div className={breakfastClass}><div className="type-meal-title">조식</div></div>
						<div className={lunchClass}><div className="type-meal-title">중식</div></div>
						<div className={dinnerClass}><div className="type-meal-title">석식</div></div>
						<div className={dessertClass}><div className="type-meal-title">후식</div></div>
					
					</div>
					{mealRows}
				</div>
			</div>
		);
	}
}

export default MealPlanPage;