import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import '../css/main-page.css';
import '../css/font-addition.css';
import '../css/goonbokmu-content.css';
import '../css/vanillacalendar.css';
import '../css/react-calendar.css';
import '../css/react-calendar-override.css';
import '../css/bootstrap-4.0.0/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PageHeader from '../js/navBar.js';
import ServiceTypeBtnsGroup from '../js/serviceTypeBtns.js';
import CalendarInput from '../js/calendarInput.js';
import ResultBox from '../js/resultBox.js';
import LoginModal from '../js/loginModal.js';
import SignupModal from '../js/signupModal.js';
import LoadingScreen from '../js/loading.js';
import MealPlanPage from '../js/mealPlanPage.js';
import {MonthCalendar} from '../js/vacationPage/vacationPage.js';
import axios from 'axios';
import Modal from 'react-modal';
import moment from 'moment';


const userDataAxios = axios.create();

const perRankMonthlyPay2017Prop = [163000, 176400, 195000, 216000];
const perRankMonthlyPay2018Prop = [306100, 331300, 366200, 405700];
const perRankMonthlyPay2020Prop = [408100, 441700, 488200, 504900];

const payMonthsType1= [4,11,18]; // TODO:순차적으로 업데이트해야 되는데 귀찮네 
const payMonthsType2 = [4,11,17];
const payMonthsType3 = [4,10,16];
const payMonthsType4 = [3,9,15];
//2018년 03월 입대자 해당사항 없음
//2018년 04월~10월 병장 1개월 조기진급 [4,11,17]
//2018년 11월~2019년 5월 상병 1개월 조기진급 [4,10,16]
//2019년 6월~ 일병 1개월 조기진급 [3,9,15]

const oneDay = 24*60*60*1000;

class MainPage extends React.Component{
	constructor(props){
		super(props);
		
		// this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		this.state={
			isGettingUserData:true,
			isLoading:true,
			vac: null,
			vacArray: null,
			user:null
		}
		this.calculateDates = this.calculateDates.bind(this);
		this.calculateSalary = this.calculateSalary.bind(this);
		
	}
	
	calculateSalary(){
		
		//Get start date, today, and end date
		const startDate = new Date(this.state.user.startDate);
		const endDate = new Date(this.state.user.endDate);
		const todayDate = new Date();
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		startDate.setMilliseconds(0);
		
		endDate.setHours(0);
		endDate.setMinutes(0);
		endDate.setSeconds(0);
		endDate.setMilliseconds(0);
		
		todayDate.setHours(0);
		todayDate.setMinutes(0);
		todayDate.setSeconds(0);
		todayDate.setMilliseconds(0);
		
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
		
		
		
		var currentDate = new Date(startDate.valueOf());
		
		const perRankMonthlyPay2017 = perRankMonthlyPay2017Prop;
		const perRankMonthlyPay2018 = perRankMonthlyPay2018Prop;
		const perRankMonthlyPay2020 = perRankMonthlyPay2020Prop;
		
		const perRankMonthlyPay = [perRankMonthlyPay2017, perRankMonthlyPay2018, perRankMonthlyPay2020];
		
		
		
		//calculate the number of days you work on the first month and the last month
		
		const firstDayOfFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const firstDayOfSecondMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
		
		const daysInFirstMonth = Math.ceil(Math.abs(firstDayOfSecondMonth.valueOf() - firstDayOfFirstMonth.valueOf())/oneDay);
		const numDaysFirstMonth = Math.ceil(Math.abs(currentDate.valueOf() - firstDayOfSecondMonth.valueOf())/oneDay);
		const ratioFirstMonth = numDaysFirstMonth / daysInFirstMonth;
		
		const firstDayOfLastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
		const firstDayOfMonthAfterLastMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
		
		const daysInLastMonth = Math.ceil(Math.abs(firstDayOfMonthAfterLastMonth.valueOf() - firstDayOfLastMonth.valueOf())/oneDay);
		
		const numDaysLastMonth = Math.ceil(Math.abs(endDate.valueOf() - firstDayOfLastMonth.valueOf())/oneDay) + 1;
		const ratioLastMonth = numDaysLastMonth / daysInLastMonth;
		
		
		
		
		var listOfPayDays = [];
		var firstDate = currentDate.getDate();
		var firstDay = currentDate.getDay();
		
		var carryOverFlag = 0;
		
		if(firstDate > 10 || (firstDate > 8 && firstDay > 4)){
			listOfPayDays.push(0);
			carryOverFlag = 1;
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
		var firstMonthNoPayFlag = 0;
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
			firstMonthNoPayFlag = 1;

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
		
		return [payTillNow, payRemainder, payTotal];
	}
	
	salaryFormatter(num){
		return Math.round(num/10000);
	}
	
	calculateDates(){ 
		//TODO: List of things to calculate
		//Number of days left
		//Number of days Done
		//Total number of days
		//Percentage done using the results above
		//Next salary amount
		//Amount left to be earned
		//적금?
		
		
		const startDate = moment.utc(new Date(this.state.user.startDate));
		const endDate = moment.utc(new Date(this.state.user.endDate));
		const today = moment.utc(new Date());


		// startDate.setHours(0);
		// startDate.setMinutes(0);
		// startDate.setSeconds(0);
		// startDate.setMilliseconds(0);
		
		// endDate.setHours(0);
		// endDate.setMinutes(0);
		// endDate.setSeconds(0);
		// endDate.setMilliseconds(0);
		
		// today.setHours(0);
		// today.setMinutes(0);
		// today.setSeconds(0);
		// today.setMilliseconds(0);
		
		// To calculate the time difference of two dates 
		const totalTime = endDate.valueOf() - startDate.valueOf(); 
		const daysFinished = today.diff(startDate, 'days');

		// To calculate the no. of days between two dates 
		const totalDays = endDate.diff(startDate, 'days');
		const daysLeft = totalDays - daysFinished;
		
		
		return [totalDays, daysLeft, daysFinished];
	}
	
	renderSingleMonthlyCalendar(yearNum, monthNum, startDayNum, vacationDates){
		//startDayNum = 0 = sunday
		//korean calendar starts from monday, monday = 1, 
		//to get korStartDayNum from startDayNum, k = (s + 6) % 7
		// const koreanStartDayNum = (startDayNum + 6) % 7
		// console.log(vacationDates);
		
		return (
			<div className="month-calendar main-page-calendar">
				<div className="month-name-row">{yearNum}년 {monthNum}월</div>
				<div className="day-name-row">
					<div className="day-name-calendar">일</div>
					<div className="day-name-calendar">월</div>
					<div className="day-name-calendar">화</div>
					<div className="day-name-calendar">수</div>
					<div className="day-name-calendar">목</div>
					<div className="day-name-calendar">금</div>
					<div className="day-name-calendar">토</div>					
				</div>
				<MonthCalendar
					startDayNum={startDayNum}
					yearNum={yearNum}
					monthNum={monthNum}
					vacationDates={vacationDates}
				/>
			</div>
		);
	}
	
	
	_isMounted = false;
	async componentDidMount(){
		this._isMounted = true;
		const token = localStorage.getItem('token');
		if(token){
			let vac = await userDataAxios.get('http://localhost:5000/vacationDates/'+token); //req.params.token
			let user = await userDataAxios.get('http://localhost:5000/users/me/'+token); //req.params.token
			if(this._isMounted){
				this.setState({
					vac: vac,
					vacArray: vac.data,
					user:user.data
				});
			}
			
		}
		
		var self = this;
		
		userDataAxios.interceptors.request.use(function (config) {

			// spinning start to show
			// UPDATE: Add this code to show global loading indicator
			// document.body.classList.add('loading-indicator');
			if(self._isMounted){
				self.setState({
					isLoading: true
				});
			}
			console.log('started');
			return config;

			}, function (error) {
				console.log('error request');
				if(self._isMounted){
					self.setState({
						isLoading: false
					});
				}
				return Promise.reject(error);
		});
		userDataAxios.interceptors.response.use(function (response) {

			// spinning hide
			// UPDATE: Add this code to hide global loading indicator
			// document.body.classList.remove('loading-indicator');
			console.log('finished');
			if(self._isMounted){
					self.setState({
						isLoading: false
					});
				}

			return response;
			}, function (error) {
				console.log('error response');
				if(self._isMounted){
					self.setState({
						isLoading: false
					});
				}
				return Promise.reject(error);
		});
		if(this._isMounted){
			this.setState({isLoading:false});
		}		
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	
	
	render(){
		var isDischarged = false;
		var vacCalContainer = <div></div>;
		var vacCalContainer2 = <div></div>;
		var datesArr = [];
		var salaryArr = [];
		var percentageDone = 0;
		var variantName = "danger";
		var startDateString = "?";
		var endDateString = "?";
		var daysLeft, daysFinished, totalDays, promotionDay, payDay, amountEarned, totalAmount, amountLeft;
		daysLeft = daysFinished = totalDays = promotionDay = payDay = amountEarned = totalAmount = amountLeft = -1;
		var strDaysLeft, strDaysFinished, strTotalDays, strPromotionDay, strPayDay, strAmountEarned, strTotalAmount, strAmountLeft;
		strDaysLeft = strDaysFinished = strTotalDays = strPromotionDay = strPayDay = strAmountEarned = strTotalAmount = strAmountLeft = "?";
		
		if(this.state.user){
			console.log(datesArr);
			startDateString = moment.utc(this.state.user.startDate).format('YYYY년 MM월 DD일');
			endDateString = moment.utc(this.state.user.endDate).format('YYYY년 MM월 DD일');
			datesArr = this.calculateDates();
			salaryArr = this.calculateSalary();
			
			totalDays = datesArr[0];
			daysLeft =datesArr[1];
			daysFinished = datesArr[2];
			if(daysLeft < 0) {
				daysLeft = 0;
			}
			if(daysFinished > totalDays){
				daysFinished = totalDays;
			}
			


			strTotalDays = totalDays.toString();
			strDaysLeft = daysLeft.toString();
			strDaysFinished = daysFinished.toString();
			
			amountEarned = this.salaryFormatter(salaryArr[0]);
			amountLeft = this.salaryFormatter(salaryArr[1]);
			totalAmount = this.salaryFormatter(salaryArr[2]);
			
			strAmountEarned = amountEarned.toString();
			strAmountLeft = amountLeft.toString();
			strTotalAmount = totalAmount.toString();
			
			var todayDate = new Date();
			
			var newTime = moment([todayDate.getFullYear(), todayDate.getMonth(), 1]);
			// this.renderSingleMonthlyCalendar(yearNum, monthNum, startDayNum, this.state.)
			const vacArray = this.state.vacArray;
			var vacDateSet = new Set();
			for(var i = 0; i < vacArray.length; i++){
				var currDate = moment(vacArray[i].startDate); 
				var endDate = moment(vacArray[i].endDate);
				var count = 0;
				while(!currDate.isSame(endDate, 'day') && count <= 50){
					vacDateSet.add(currDate.year()*10000 + (currDate.month()+1)*100 + currDate.date());
					currDate.add(1, 'd');
					count += 1;
				}
				vacDateSet.add(currDate.year()*10000 + (currDate.month()+1)*100 + currDate.date());
			}
			
			vacCalContainer = this.renderSingleMonthlyCalendar(todayDate.getFullYear(), todayDate.getMonth() + 1, newTime.day(), vacDateSet);
			
			newTime = moment([todayDate.getFullYear(), todayDate.getMonth() + 1, 1]);
			vacCalContainer2 = this.renderSingleMonthlyCalendar(todayDate.getFullYear(), todayDate.getMonth() + 2, newTime.day(), vacDateSet);
			
			percentageDone = Math.round(datesArr[2] / datesArr[0] * 10000); //round to nearest hundredth
			percentageDone /= 100;
			if(percentageDone >= 100){
				percentageDone = 100;
				isDischarged = true;
			}
			
			if(percentageDone < 25){
				variantName = "danger";
			}else if(percentageDone < 50){
				variantName = "warning";
			}else if(percentageDone < 75){
				variantName = "info";
			}else {
				variantName = "success";
			}

		}else {
			var todayDate = new Date();
			
			var newTime = moment([todayDate.getFullYear(), todayDate.getMonth(), 1]);
			vacCalContainer = this.renderSingleMonthlyCalendar(todayDate.getFullYear(), todayDate.getMonth() + 1, newTime.day(), new Set());
			
			newTime = moment([todayDate.getFullYear(), todayDate.getMonth() + 1, 1]);
			vacCalContainer2 = this.renderSingleMonthlyCalendar(todayDate.getFullYear(), todayDate.getMonth() + 2, newTime.day(), new Set());
		}
		
		
		return(
			<div className="main-page-container">
				<div className="vacation-dates-container">
					{vacCalContainer}
					{vacCalContainer2}
				</div>
				<div className="dates-and-salary-container">
					<div>
						<ProgressBar className="dates-percentage-bar"
							now={percentageDone} label={`${percentageDone}%`} 
							striped variant={variantName}/>
						<div className="start-and-end-dates">
							<div className="start-date-container">{startDateString}</div>
							<div className="end-date-container">{endDateString}</div>
						</div>
					</div>
					
					<div className="dates-display-container">
						<div className="number-display-row">전역일 : D-{strDaysLeft}</div>
						<div className="number-display-row">진급일 : D-{}</div>
						<div className="number-display-row">복무 일수 : {strDaysFinished}일</div>
						<div className="number-display-row">총 일수 : {strTotalDays}일</div>
						
					</div>
					<div className="salary-display-container">
						<div className="number-display-row">월급일 : D-{}</div>
						<div className="number-display-row">번 액수 : {strAmountEarned}만원</div>
						<div className="number-display-row">남은 액수 : {strAmountLeft}만원</div>
						<div className="number-display-row">총 봉급 : {strTotalAmount}만원</div>
					</div>
					<div className="meal-display-container">
						<MealPlanPage 
							handleMealUnitChange={this.props.handleMealUnitChange} 
							mealUnit={this.props.mealUnit} 
							saveMealUnitChange={this.props.saveMealUnitChange}
							isOnMainPage={true}>
						</MealPlanPage>
					</div>
				</div>
				
				
			</div>
		);
	}
}

export default MainPage;