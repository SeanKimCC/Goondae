import React from 'react';



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
	
	calculateOriginalDaysLeft(){
		const numMonths = this.props.numMonths[this.props.selectedType];
		const selectedDate = this.props.selectedDate;
		const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		
		var newDate = date;
		
		newDate.setMonth(newDate.getMonth() + numMonths);
		newDate.setDate(newDate.getDate()-1);
		
		// console.log(newDate);

		return newDate;
	}
	
	calculateEarliestDate(){
		const shortenedNumMonths = this.props.shortenedNumMonths[this.props.selectedType];
		const selectedDate = this.props.selectedDate;
		const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		
		var newDate = date;
		
		newDate.setMonth(newDate.getMonth() + shortenedNumMonths);
		newDate.setDate(newDate.getDate()-1);
		
		// console.log(newDate);

		return newDate;
	}
	
	calculateUpdatedDaysLeft(){ // numShortenedDays
		
		const selectedDate = this.props.selectedDate;
		const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		console.log("cUDL:", date);
		
		const subtractStartDay = new Date(2017, 0, 2);

		const oneDay = 24*60*60*1000; 	

		var diffDays = Math.round(Math.abs((subtractStartDay.getTime() - date.getTime())/(oneDay)));

		var daysToSubtract = Math.ceil(diffDays/14);
		
		var newDate = this.calculateOriginalDaysLeft();
		newDate.setDate(newDate.getDate()-daysToSubtract);
		
		var earliestDate = this.calculateEarliestDate();
		if(newDate < earliestDate){
			console.log(earliestDate, "earliest date");
			
			daysToSubtract = Math.round(Math.abs((earliestDate.getTime() - date.getTime())/(oneDay)));
			return [earliestDate, daysToSubtract];
		}
		
		console.log(newDate);
		
		return [newDate, daysToSubtract];
	}
	
	
	
	calculateSalaryLeft(){
		//calculate first month 
		const perRankMonthlyPay2017 = this.props.perRankMonthlyPay2017;
		const perRankMonthlyPay2018 = this.props.perRankMonthlyPay2018;
		const perRankMonthlyPay2020 = this.props.perRankMonthlyPay2020;
		
		const perRankMonthlyPay = [perRankMonthlyPay2017, perRankMonthlyPay2018, perRankMonthlyPay2020];
		
		var payMonths = [3,7,7];
		
		const selectedDate = this.props.selectedDate;
		const endDate = this.calculateUpdatedDaysLeft()[0];
		
		var tempDate = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		var tempTempDate = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		var tempDateForDatesArray = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		var count = 0;
		var firstDayOfNextMonth = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
		
		const oneDay = 24*60*60*1000; 	
		
		
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
			payMonths[0] += 1;
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
			
			if(startCount < payMonths[0]){
				monthlySalary[startCount] += perRankMonthlyPay[payCategoryYear][0];	
			} else if(startCount < (payMonths[0] + payMonths[1])){
				monthlySalary[startCount] += perRankMonthlyPay[payCategoryYear][1];	
			} else if(startCount < (payMonths[0] + payMonths[1] + payMonths[2])){
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
		
		tempDate = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		
		var monthCount = 0;
		while(today >= payDates[monthCount] && monthCount < count && today <= endDate){
			currentAmount += monthlySalary[monthCount];
			monthCount++;
		}
		console.log(currentAmount);
		
		
		console.log(currentAmount);
		
		var amountLeftToEarn = totalSalary - currentAmount;
		
		console.log(totalSalary);
		console.log(monthlySalary);
		
		return [currentAmount, amountLeftToEarn, totalSalary];
	}

	
	
	
	
	render(){		
		var salaries = this.calculateSalaryLeft();
		var currentAmount = salaries[0];
		var amountLeftToEarn = salaries[1];
		var totalSalary = salaries[2];
		
		const selectedDate = this.props.selectedDate;
		var formattedSelectedDate = selectedDate[2] + "년 " + selectedDate[1] + "월 " + selectedDate[0] + "일";
		
		const numDaysLeft = 1; 
		var updatedDaysLeft = this.calculateUpdatedDaysLeft();
		var updatedDate = updatedDaysLeft[0];
		var updatedDaysSubtracted = updatedDaysLeft[1];
		
		var originalDate = this.calculateOriginalDaysLeft();
		
		var formattedUpdatedDate = this.formatDateObject(updatedDate);
		var formattedOriginalDate = this.formatDateObject(originalDate);
		
		
		const dayWolgeupResult = this.props.isDaysNotWolgeup ? (
			<div className="result-box">
			입대일 : <span>{formattedSelectedDate}</span>
			<br/>
			기존 전역일 : <span>{formattedOriginalDate}</span>
			<br/>
			단축 후 전역일 : <span>{formattedUpdatedDate}</span>
			<br/>
			단축일수 : <span>{updatedDaysSubtracted}일</span>
			</div>
		) : (
			<div className="result-box">
			입대일 : <span>{formattedSelectedDate}</span>	
			<br/>
			입대 후 번 금액 : <span>{currentAmount}</span>
			<br/>
			지금부터 전역까지 벌 금액 : <span>{amountLeftToEarn}</span>
			<br/>
			입대부터 전역까지 벌 총 금액 : <span>{totalSalary}</span>
			<br/>
			</div>
		);
			
		
		return(<div>{dayWolgeupResult}</div>);
	}
}

export default ResultBox;