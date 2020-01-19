import React from 'react';
import * as myConstClass from './utils/languageConstants.js';

const payMonthsType1= [4,11,18]; // TODO:순차적으로 업데이트해야 되는데 귀찮네 
const payMonthsType2 = [4,11,17];
const payMonthsType3 = [4,10,16];
const payMonthsType4 = [3,9,15];
//2018년 03월 입대자 해당사항 없음
//2018년 04월~10월 병장 1개월 조기진급 [4,11,17]
//2018년 11월~2019년 5월 상병 1개월 조기진급 [4,10,16]
//2019년 6월~ 일병 1개월 조기진급 [3,9,15]

const oneDay = 24*60*60*1000;
const numMonthsProp = [21, 23, 24, 21, 21, 23, 23, 24];
const shortenedNumMonthsProp = [18, 20, 22, 18, 18, 20, 20, 21]; 
const perRankMonthlyPay2017Prop = [163000, 176400, 195000, 216000];
const perRankMonthlyPay2018Prop = [306100, 331300, 366200, 405700];
const perRankMonthlyPay2020Prop = [408100, 441700, 488200, 504900];

class ResultBox extends React.Component{
	getDaysInThisMonth(date) {
		return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
	}
	
	
	formatDateObject(date){

		var dd = date.getDate();
		var mm = date.getMonth() + 1; //January is 0!
		var yyyy = date.getFullYear();
		
		var dateString = yyyy.toString() + "년 " + mm.toString() + "월 " + dd.toString() + "일";
		
		return (dateString);
	}
	
	formatMoney(money){
		var lenMoney = money.length;
		var formattedMoney = "";
		var commaPos = lenMoney % 3;
		if (commaPos === 0){
			commaPos += 3;
		}
		for (var i = 0; i < lenMoney; i++){
			if( i === commaPos){
				formattedMoney = formattedMoney.concat(",");
				commaPos += 3;
			}
			formattedMoney = formattedMoney.concat(money[i]);
		}
		return formattedMoney;
	}
	
	calculateOriginalDaysLeft(){
		const numMonths = numMonthsProp[this.props.selectedType];
		const selectedDate = this.props.selectedDate;
		// const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = new Date(selectedDate.getTime());
		
		var newDate = date;
		
		newDate.setMonth(newDate.getMonth() + numMonths);
		newDate.setDate(newDate.getDate()-1);
		
		return newDate;
	}
	
	calculateEarliestDate(){
		const shortenedNumMonths = shortenedNumMonthsProp[this.props.selectedType];
		const selectedDate = this.props.selectedDate;
		// const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = new Date(selectedDate.getTime());
		
		var newDate = date;
		
		newDate.setMonth(newDate.getMonth() + shortenedNumMonths);
		newDate.setDate(newDate.getDate()-1);

		return newDate;
	}
	
	calculateUpdatedDaysLeft(){ // numShortenedDays
		
		const selectedDate = this.props.selectedDate;
		// const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = new Date(selectedDate.getTime());
		
		var subtractStartDay;
		switch (this.props.selectedType){
			case 0:
			case 3:
			case 4:
				subtractStartDay = new Date(2017, 0, 2);
				break;
			case 1:
			case 5:
			case 6:
				subtractStartDay = new Date(2016, 10, 2);
				break;
			case 2:
				subtractStartDay = new Date(2016, 9, 2);
				break;
			case 7:
				subtractStartDay = new Date(2016, 9, 2);
				break;
			default:
				subtractStartDay = new Date(2017, 0, 2);
				break;
		}


		var diffDays = Math.round(Math.abs((subtractStartDay.getTime() - date.getTime())/(oneDay)));

		var daysToSubtract = Math.ceil(diffDays/14);
		
		const originalDate = this.calculateOriginalDaysLeft();
		var newDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate()-daysToSubtract);
		
		var earliestDate = this.calculateEarliestDate();
		if(newDate < earliestDate){
			
			daysToSubtract = Math.round(Math.abs((earliestDate.getTime() - originalDate.getTime())/(oneDay)));
			
			return [earliestDate, daysToSubtract];
		}
		
		return [newDate, daysToSubtract];
	}
	
	newCalculateSalaryLeft(){
		//Get start date, today, and end date
		const startDate = this.props.selectedDate;
		const startYear = startDate.getFullYear();
		const startMonth = startDate.getMonth() + 1;
		var payMonths;
		if(startYear <= 2018){
			if(startMonth <= 3){
				payMonths = payMonthsType1;
			}else if(startMonth <= 10){
				payMonths = payMonthsType2;
			}else{
				payMonths = payMonthsType3;
			}
		} else if(startYear <= 2019){
			if(startMonth <= 5){
				payMonths = payMonthsType3;
			}else {
				payMonths = payMonthsType4;
			}
		} else {
			payMonths = payMonthsType4;
		}
		
		const todayDateWithHours = new Date();
		const todayDate = new Date(todayDateWithHours.getFullYear(), todayDateWithHours.getMonth(), todayDateWithHours.getDate());
		const endDate = this.calculateUpdatedDaysLeft()[0];
		
		//variable for current date. Starts at start date
		// var currentDate = new Date(startDate[2],startDate[1]-1,startDate[0]);
		var currentDate = new Date(startDate.getTime());
		
		const perRankMonthlyPay2017 = perRankMonthlyPay2017Prop;
		const perRankMonthlyPay2018 = perRankMonthlyPay2018Prop;
		const perRankMonthlyPay2020 = perRankMonthlyPay2020Prop;
		
		const perRankMonthlyPay = [perRankMonthlyPay2017, perRankMonthlyPay2018, perRankMonthlyPay2020];
		
		
		
		//calculate the number of days you work on the first month and the last month
		
		const firstDayOfFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const firstDayOfSecondMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
		
		const daysInFirstMonth = Math.ceil(Math.abs(firstDayOfSecondMonth.getTime() - firstDayOfFirstMonth.getTime())/oneDay);
		const numDaysFirstMonth = Math.ceil(Math.abs(currentDate.getTime() - firstDayOfSecondMonth.getTime())/oneDay);
		const ratioFirstMonth = numDaysFirstMonth / daysInFirstMonth;
		
		const firstDayOfLastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
		const firstDayOfMonthAfterLastMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
		
		const daysInLastMonth = Math.ceil(Math.abs(firstDayOfMonthAfterLastMonth.getTime() - firstDayOfLastMonth.getTime())/oneDay);
		
		const numDaysLastMonth = Math.ceil(Math.abs(endDate.getTime() - firstDayOfLastMonth.getTime())/oneDay) + 1;
		const ratioLastMonth = numDaysLastMonth / daysInLastMonth;
		
		
		
		
		var listOfPayDays = [];
		var firstDate = currentDate.getDate();
		var firstDay = currentDate.getDay();
		
		
		if(firstDate > 10 || (firstDate > 8 && firstDay > 4)){
			listOfPayDays.push(0);
			currentDate.setMonth(currentDate.getMonth() + 1);
			currentDate.setDate(8);
		} 
		
		const endYear = endDate.getFullYear();
		const endMonth = endDate.getMonth();
		
		//dates at which you'll be paid
		while (currentDate <= endDate || (currentDate.getMonth() === endMonth && currentDate.getFullYear() === endYear)){
			var currentDayOfM = currentDate.getDate();
			var currentDayOfW = currentDate.getDay();
			if((currentDayOfM === 10 && (currentDayOfW !== 0 && currentDayOfW !== 6)) || ((currentDayOfM === 8 || currentDayOfM === 9) && currentDayOfW === 5)){ // 10th and not weekend, or 8~9th and friday
				
				listOfPayDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
				
				
				currentDate.setMonth(currentDate.getMonth() + 1);
				currentDate.setDate(8);
			}
			else {
				currentDate.setDate(currentDate.getDate() + 1);
			}
			
			//inf loop occurred here
		}
		
		var numMonthsOfService = listOfPayDays.length;
		var listOfPayAmounts = [];
		var monthlySal;
		var yearIndex;
		var rankIndex;
		
		for (var i = 0; i < numMonthsOfService; i++){
			listOfPayAmounts.push(0);
		}
		
		//add first month salary
		if(listOfPayDays[0] === 0){
			if(listOfPayDays[1].getFullYear() <= 2017){
				yearIndex = 0;
			} else if(listOfPayDays[1].getFullYear() <= 2019){
				yearIndex = 1;
			} else{
				yearIndex = 2;
			}
			monthlySal = perRankMonthlyPay[yearIndex][0];

			listOfPayAmounts[1] += Math.round((ratioFirstMonth * monthlySal)/100) *100;
		} else {
			if(listOfPayDays[0].getFullYear() <= 2017){
				yearIndex = 0;
			} else if(listOfPayDays[0].getFullYear() <= 2019){
				yearIndex = 1;
			} else {
				yearIndex = 2;
			}
			monthlySal = perRankMonthlyPay[yearIndex][0];
			listOfPayAmounts[0] += Math.round((ratioFirstMonth * monthlySal)/100) *100;
		}
		
		//adding salaries of the entire service except first and last months
		var currentYear;
		for (i = 1; i < numMonthsOfService - 1; i++){
			
			currentYear = listOfPayDays[i].getFullYear();
			if(currentYear <= 2017){
				yearIndex = 0;
			} else if(currentYear <= 2019){
				yearIndex = 1;
			} else{
				yearIndex = 2;
			}
			
			if(i < payMonths[0]){
				rankIndex = 0;
			} else if(i < payMonths[1]) {
				rankIndex = 1;
			} else if(i < payMonths[2]) {
				rankIndex = 2;
			} else {
				rankIndex = 3;
			}
			
			monthlySal = perRankMonthlyPay[yearIndex][rankIndex];
			
			listOfPayAmounts[i] += monthlySal;
			
		}
		
		//Adding last month's salary
		currentYear = listOfPayDays[i].getFullYear();
		if(currentYear <= 2017){
			yearIndex = 0;
		} else if(currentYear <= 2019){
			yearIndex = 1;
		} else{
			yearIndex = 2;
		}

		if(i < payMonths[0]){
			rankIndex = 0;
		} else if(i < payMonths[1]) {
			rankIndex = 1;
		} else if(i < payMonths[2]) {
			rankIndex = 2;
		} else {
			rankIndex = 3;
		}

		monthlySal = perRankMonthlyPay[yearIndex][rankIndex];
		listOfPayAmounts[numMonthsOfService - 1] += Math.round((ratioLastMonth * monthlySal) / 100) * 100;

		
		
		
		var payTotal = 0;
		var payTillNow = 0;
		var payRemainder = 0;
		
		for (i=0; i < numMonthsOfService; i++){
			payTotal += listOfPayAmounts[i];
		}
		
		for (i = 0 ; i < numMonthsOfService; i++){
			if(todayDate >= listOfPayDays[i]){
				payTillNow += listOfPayAmounts[i];
			}
		}
		
		payRemainder = payTotal - payTillNow;
		
		return [payTillNow.toString(), payRemainder.toString(), payTotal.toString()];
	}
	
	calculateSalaryLeft(){
		//calculate first month 
		const perRankMonthlyPay2017 = perRankMonthlyPay2017Prop;
		const perRankMonthlyPay2018 = perRankMonthlyPay2018Prop;
		const perRankMonthlyPay2020 = perRankMonthlyPay2020Prop;
		
		const perRankMonthlyPay = [perRankMonthlyPay2017, perRankMonthlyPay2018, perRankMonthlyPay2020];
		
		var numPayMonths = [4,7,7];
		
		const selectedDate = this.props.selectedDate;
		const endDate = this.calculateUpdatedDaysLeft()[0];
		
		// var tempDate = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		// var tempTempDate = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		// var tempDateForDatesArray = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		var tempDate = new Date(selectedDate.getTime());
		var tempTempDate = new Date(selectedDate.getTime());
		var tempDateForDatesArray = new Date(selectedDate.getTime());
		var count = 0;
		var firstDayOfNextMonth = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
		
		 	
		
		
		var numDaysFirstMonth = (tempDate.getTime() - firstDayOfNextMonth.getTime())/oneDay;
		
		var firstMonthPayFlag = true;
		var numDaysOfMonth = this.getDaysInThisMonth(tempDate);
		var tempYear = tempDate.getFullYear(); 
		var payCategoryYear = 0;
		if(tempYear <= 2017){
			payCategoryYear = 0;
		} else if(tempYear <= 2019) {
			payCategoryYear = 1;
		} else {
			payCategoryYear = 2;
		}
		
		var firstMonthSalary = Math.round(Math.abs((numDaysFirstMonth/numDaysOfMonth * perRankMonthlyPay[payCategoryYear][0])/100))*100;
		
		if(tempDate.getDate() === 10){
			count++;
		} else if(tempDate.getDate() < 10){
			count++;
			tempDate.setDate(10);
		} else{
			firstMonthPayFlag = false;
			tempDate.setMonth(tempDate.getMonth() + 1);
			tempDate.setDate(10);
		}
		
		while(tempDate <= endDate ){
			tempDate.setMonth(tempDate.getMonth() + 1);
			count++;
		}
		var monthlySalary = Array(count).fill(0);
		var payDates = Array(count).fill(null);
		
		monthlySalary[0] = firstMonthSalary;
		
		var startCount = 0;
		if(firstMonthPayFlag){
			startCount = 1;
			numPayMonths[0] += 1;
		}
		
		if(tempDateForDatesArray.getDate() > 10){
			tempDateForDatesArray.setMonth(tempDateForDatesArray.getMonth() + 1);
			tempDateForDatesArray.setDate(10);
		}
		
		for(var i = 0; i < count-1; i++){
			payDates[i] = new Date(tempDateForDatesArray);
			tempDateForDatesArray.setMonth(tempDateForDatesArray.getMonth() + 1);
		}
		
		if(endDate.getDate() > 10){
			payDates[count-1] = new Date(tempDateForDatesArray);	
		} else {
			payDates[count-1] = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
		}
		
		while(startCount < count){
			tempYear = tempTempDate.getFullYear();
			
			if(tempYear <= 2017){
				payCategoryYear = 0;
			} else if(tempYear <= 2019) {
				payCategoryYear = 1;
			} else {
				payCategoryYear = 2;
			}
			
			if(startCount < numPayMonths[0]){
				monthlySalary[startCount] += perRankMonthlyPay[payCategoryYear][0];	
			} else if(startCount < (numPayMonths[0] + numPayMonths[1])){
				monthlySalary[startCount] += perRankMonthlyPay[payCategoryYear][1];	
			} else if(startCount < (numPayMonths[0] + numPayMonths[1] + numPayMonths[2])){
				monthlySalary[startCount] += perRankMonthlyPay[payCategoryYear][2];	
			} else {
				monthlySalary[startCount] += perRankMonthlyPay[payCategoryYear][3];	
			}
			startCount++;
			tempTempDate.setMonth(tempTempDate.getMonth() + 1);
		}
		
		tempYear = tempTempDate.getFullYear();
		
		if(tempYear <= 2017){
			payCategoryYear = 0;
		} else if(tempYear <= 2019) {
			payCategoryYear = 1;
		} else {
			payCategoryYear = 2;
		}
		
		
		firstDayOfNextMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
		var numDaysLastMonth = endDate.getDate();
		numDaysOfMonth = this.getDaysInThisMonth(endDate);
		
		
		monthlySalary[startCount-1] = Math.round(Math.abs((numDaysLastMonth/numDaysOfMonth * perRankMonthlyPay[payCategoryYear][3])/100))*100;
		
		var totalSalary = 0;
		startCount = 0;
		while(startCount < count){
			totalSalary += monthlySalary[startCount];
			startCount ++;
		}
		
		var currentAmount = 0;
		var today = new Date();
		startCount = 0;
		
		// tempDate = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		tempDate = new Date(selectedDate.getTime());
		
		var monthCount = 0;
		while(today >= payDates[monthCount] && monthCount < count && today <= endDate){
			currentAmount += monthlySalary[monthCount];
			monthCount++;
		}
		
		var amountLeftToEarn = totalSalary - currentAmount;
		
		
		return [currentAmount.toString(), amountLeftToEarn.toString(), totalSalary.toString()];
	}

	
	
	
	
	render(){
		// var calculate = require('utils/calculate.js');
		
		var salaries = this.newCalculateSalaryLeft();
		var currentAmount = this.formatMoney(salaries[0]);
		var amountLeftToEarn = this.formatMoney(salaries[1]);
		var totalSalary = this.formatMoney(salaries[2]);

		
		const selectedDate = this.props.selectedDate;
		// var formattedSelectedDate = selectedDate[2] + "년 " + selectedDate[1] + "월 " + selectedDate[0] + "일";
		var formattedSelectedDate = selectedDate.getFullYear() + "년 " + (selectedDate.getMonth() + 1) + "월 " + selectedDate.getDate() + "일";
		
		// const numDaysLeft = 1; 
		var updatedDaysLeft = this.calculateUpdatedDaysLeft();
		var updatedDate = updatedDaysLeft[0];
		var updatedDaysSubtracted = updatedDaysLeft[1];
		
		var originalDate = this.calculateOriginalDaysLeft();
		
		var formattedUpdatedDate = this.formatDateObject(updatedDate);
		var formattedOriginalDate = this.formatDateObject(originalDate);
		
		
		const dayWolgeupResult = this.props.isDaysNotWolgeup ? (
			<div className="result-box">
			{myConstClass.ENLISTMENTDATE[this.props.userLanguage]} : <span>{formattedSelectedDate}</span>
			<br/>
			{myConstClass.ORIGINALDISCHARGEDATE[this.props.userLanguage]} : <span>{formattedOriginalDate}</span>
			<br/>
			{myConstClass.DISCHARGEDATE[this.props.userLanguage]} : <span>{formattedUpdatedDate}</span>
			<br/>
			{myConstClass.DAYSSHORTENED[this.props.userLanguage]} : <span>{updatedDaysSubtracted}일</span>
			</div>
		) : (
			<div className="result-box">
			{myConstClass.ENLISTMENTDATE[this.props.userLanguage]} : <span>{formattedSelectedDate}</span>	
			<br/>
			{myConstClass.MONEYEARNED[this.props.userLanguage]} : <span>{currentAmount}</span>
			<br/>
			{myConstClass.MONEYLEFT[this.props.userLanguage]} : <span>{amountLeftToEarn}</span>
			<br/>
			{myConstClass.TOTALPAY[this.props.userLanguage]} : <span>{totalSalary}</span>
			<br/>
			</div>
		);
			
		
		return(<div>{dayWolgeupResult}</div>);
	}
}

export default ResultBox;