import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/index.css';
import '../../css/vacation-page.css';
import CalendarInput from '../../js/calendarInput.js';
import LockedPage from '../lockedPage.js';
import axios from 'axios';
import Modal from 'react-modal';
import moment from 'moment';
import * as myConstClass from '../utils/languageConstants.js';

// class DayInMonthCalendar extends React.Component{
// 	render(){
// 		const todayDay = this.props.todayDay;
// 		return(
// 			<div className="day-in-month-calendar">{todayDay}</div>
// 		)
// 	}
// }
axios.defaults.baseURL = myConstClass.SERVERADDRESS;
const userDataAxios = axios.create(); 
class MonthCalendar extends React.Component{
	
	renderDay(i, ind){
		
		var dayClass = (i == 0 ? "day-in-month-calendar white-color" : "day-in-month-calendar");
		if(ind == 0){
			dayClass += " first-day-of-week";
		} else if (ind == 6){
			dayClass += " last-day-of-week";
		}
		// 
		if(this.props.vacationDates.has(this.props.yearNum*10000+this.props.monthNum*100+i)){
			// 
			dayClass += " vacation-day";
		}
		
		return(
			<div className={dayClass}>{i}</div>
		)
		
	}
	
	render(){ // TODO: check this part of code. There's an extra line when the month ends on Saturday.
		//TODO: you can add color depending on users' choice of color for the date
		
		const startDayNum = this.props.startDayNum; //monday = 0, sunday = 6
		const currDate = new Date(this.props.yearNum, this.props.monthNum, 0); // last day of the month
		const numDaysInMonth = currDate.getDate(); 
		let daysInMonth = [];
		let dayNumOfDay = startDayNum;
		let weekInMonth = [];
		for(var i = 0; i < startDayNum; i++){
			weekInMonth.push(0);
		}
		for(var i = 0; i < numDaysInMonth; i++){
			// 
			weekInMonth.push(i+1);
			dayNumOfDay++;
			if(dayNumOfDay == 7){
				dayNumOfDay = 0;
				daysInMonth.push(weekInMonth);
				weekInMonth = [];
			} else if(i == numDaysInMonth -1){
				while(weekInMonth.length < 7){
					weekInMonth.push(0);
				}
				daysInMonth.push(weekInMonth);
			}
		}
		
		
		
		// 
		const numRows = daysInMonth.length;
		let hello = [];
		
		for(i = 0; i < numRows; i++){
			hello[i] = daysInMonth[i].map((k, ind) => {
				return this.renderDay(k, ind);
			});
		}
		
		const byee = hello.map((k) => {
			var rowClass = ""
			if(numRows == 5){
				rowClass = "five-row-calendar month-calendar-row";
			} else if(numRows == 6){
				rowClass = "six-row-calendar month-calendar-row";
			}
			return (<div className={rowClass}>{k}</div>);
		});
		
		return(
			<div className="vac-calendar-dates-container">{byee}</div>
		)
	}
}

class YearCalendar extends React.Component{
	render(){
		return(
			<div></div>
		);
	}
}

const vacationPageAxios = axios.create();


class VacationPage extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			isGettingUserData:true,
			isLoading:true,
			vac: null,
			vacArray: null,
			user:null
		}
		
	}

	
	_isMounted = false;
	async componentDidMount(){
		this._isMounted = true;
		const token = localStorage.getItem('token');
		if(token){
			let vac = await userDataAxios.get('/vacationDates/'+token); //req.params.token
			let user = await userDataAxios.get('/users/me/'+token); //req.params.token
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
			
			return config;

			}, function (error) {
				
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
			
			if(self._isMounted){
					self.setState({
						isLoading: false
					});
				}

			return response;
			}, function (error) {
				
				if(self._isMounted){
					self.setState({
						isLoading: false
					});
				}
				return Promise.reject(error);
		});
		this.setState({isLoading:false});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}	
	
	renderSingleMonthlyCalendar(yearNum, monthNum, startDayNum, vacationDates){
		//startDayNum = 0 = sunday
		//korean calendar starts from monday, monday = 1, 
		//to get korStartDayNum from startDayNum, k = (s + 6) % 7
		// const koreanStartDayNum = (startDayNum + 6) % 7
		// 
		return (
			<div className="month-calendar">
				<div className="month-name-row">{yearNum}{myConstClass.YEAR[this.props.userLanguage]} {myConstClass.MONTHOFYEAR[this.props.userLanguage][monthNum-1]}</div>
				<div className="day-name-row">
					<div className="day-in-month-calendar first-day-of-week">{myConstClass.DAYSOFWEEK[this.props.userLanguage][0]}</div>
					<div className="day-in-month-calendar">{myConstClass.DAYSOFWEEK[this.props.userLanguage][1]}</div>
					<div className="day-in-month-calendar">{myConstClass.DAYSOFWEEK[this.props.userLanguage][2]}</div>
					<div className="day-in-month-calendar">{myConstClass.DAYSOFWEEK[this.props.userLanguage][3]}</div>
					<div className="day-in-month-calendar">{myConstClass.DAYSOFWEEK[this.props.userLanguage][4]}</div>
					<div className="day-in-month-calendar">{myConstClass.DAYSOFWEEK[this.props.userLanguage][5]}</div>
					<div className="day-in-month-calendar last-day-of-week">{myConstClass.DAYSOFWEEK[this.props.userLanguage][6]}</div>					
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
	
	render(){
		const vacationPageContent = []; //array of month calendars
		
		if(this.state.user && this.state.vacArray){
			const userData = this.state.user;
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
			// 
			const startMonth = moment(userData.startDate).month();
			const startYear = moment(userData.startDate).year();
			const endMonth = moment(userData.endDate).month();
			const endYear = moment(userData.endDate).year();
			
			var newTime = moment([startYear, startMonth, 1]);
			var count = 0;
			var vacArrCount = 0;
			while(count < 30 &&( moment(newTime).year() < endYear || (moment(newTime).month() <= endMonth && moment(newTime).year() === endYear))){
				const newMonth = moment(newTime).month();
				const newYear = moment(newTime).year();
				// const momentStartDate = moment(vacArray[vacArrCount].startDate);
				// const momentEndDate = moment(vacArray[vacArrCount].endDate);
				// 
				vacationPageContent.push(this.renderSingleMonthlyCalendar(newYear, newMonth+1, moment(newTime).day(), vacDateSet));
				
				newTime = moment(newTime).add(1, 'M');
				// 
				count += 1;
				
			}
		}
		const monthNum = 2;

		var loadingClass = "loading-screen ";
		if(this.state.isLoading){
			return(
				<div className="vacation-calendars-container"><div className="loading-screen "><div className="lds-dual-ring"></div></div>{vacationPageContent}</div>
			);			
		} else {
			if(this.props.isLoggedIn){
				return(
					<div className="vacation-calendars-container"><div className="loading-screen hidden"></div>{vacationPageContent}</div>
				);
			}
		}		
		return(
			<div className="vacation-calendars-container">
				<LockedPage openLoginModal = {this.props.openLoginModal}></LockedPage>
			</div>
		);
			
		
		
	}
}
export {VacationPage, MonthCalendar};