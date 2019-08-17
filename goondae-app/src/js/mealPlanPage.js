import React from 'react';
import ReactDOM from 'react-dom';
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
		console.log(setDate);
		console.log(dayOfDate);
		
		if(dayOfDate == 0){ // #FFC0C0 #FFE5E5
			return "sunday-meal-row";
		}else if(dayOfDate == 6){ // #DADAFF
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
		
		const keyStringArray = ['dateItem:', 'breakfastItem:', 'lunchItem:', 'dinnerItem:', 'dessertItem:'];
		
		
		let newDayMealStringArray = [];
		for(var k = 0; k < 5; k++){
			let newDayMealString = [];
			for(var j = 0; j < newMealsArray[k].length; j++){
				newDayMealString.push(this.renderSingleItemOfMeal(newMealsArray[k][j], keyStringArray[k] + j));
			}
			newDayMealStringArray.push(newDayMealString);
		}
		console.log(newMealsArray[0]);
		const rowClass = "type-meal-row " + this.getColorWithDate(newMealsArray[0][0]);
		return (<div className={rowClass} key={"row"+i}>
					<div className="meal-cell date-meal-cell" key={"date:"+i}>{newDayMealStringArray[0]}</div>
					<div className="meal-cell breakfast-meal-cell" key={"breakfast:"+i}>{newDayMealStringArray[1]}</div>
					<div className="meal-cell lunch-meal-cell" key={"lunch:"+i}>{newDayMealStringArray[2]}</div>
					<div className="meal-cell dinner-meal-cell" key={"dinner:"+i}>{newDayMealStringArray[3]}</div>
					<div className="meal-cell dessert-meal-cell" key={"dessert:"+i}>{newDayMealStringArray[4]}</div>					
				</div>);
		
	}
	
	
	render() {
		var mealDataJson = require('../json/2019-june-meal.json');
		console.log(mealDataJson);
		const options = [
			{value: 0, label: '육군훈련소'},
			{value: 1, label: '제2급양대'},
			{value: 2, label: '제3급양대'},
			{value: 3, label: '제8급양대'},
			{value: 4, label: '제11급양대'},
			{value: 5, label: '제5급양대'},
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
		
		console.log(currentUnitMealData);
		console.log(currentUnitMealData.length);
		
		const dateCell = [];
		const breakfastCell = [];
		const lunchCell = [];
		const dinnerCell = [];
		const dessertCell = [];
		const mealRow = []
		
		
		for(var i = 0; i < currentUnitMealData.length; i++){
			mealRow.push(this.renderDayMealRow(currentUnitMealData[i],i));
			// dateCell.push(this.renderMealOfTheDay(currentUnitMealData[i].날짜,"date",i));
			// breakfastCell.push(this.renderMealOfTheDay(currentUnitMealData[i].조식,"breakfast",i));
			// lunchCell.push(this.renderMealOfTheDay(currentUnitMealData[i].중식,"lunch",i));
			// dinnerCell.push(this.renderMealOfTheDay(currentUnitMealData[i].석식,"dinner",i));
			// dessertCell.push(this.renderMealOfTheDay(currentUnitMealData[i].후식,"dessert",i));
		}
		
		let saveBtnClass = "submit-btn btn ";
		let mealSelectClass = "meal-unit-select";
		if(!localStorage.getItem('token')){
			saveBtnClass += "hidden";
			mealSelectClass += "full-length";
		}
		
		const cellClass = "meal-type-column";
		
		
		
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
						<div className="meal-cell date-meal-cell"><div className="type-meal-title">날짜</div></div>
						<div className="meal-cell breakfast-meal-cell"><div className="type-meal-title">조식</div></div>
						<div className="meal-cell lunch-meal-cell"><div className="type-meal-title">중식</div></div>
						<div className="meal-cell dinner-meal-cell"><div className="type-meal-title">석식</div></div>
						<div className="meal-cell dessert-meal-cell"><div className="type-meal-title">후식</div></div>
					
					</div>
					{mealRow}
				</div>
			</div>
		);
	}
}

export default MealPlanPage;