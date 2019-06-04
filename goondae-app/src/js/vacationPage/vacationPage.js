import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/index.css';
import '../../css/vacation-page.css';
import CalendarInput from '../../js/calendarInput.js';
import axios from 'axios';
import Modal from 'react-modal';

// class DayInMonthCalendar extends React.Component{
// 	render(){
// 		const todayDay = this.props.todayDay;
// 		return(
// 			<div className="day-in-month-calendar">{todayDay}</div>
// 		)
// 	}
// }

class MonthCalendar extends React.Component{
	
	renderDay(i){
		const dayClass = (i == 0 ? "day-in-month-calendar white-color" : "day-in-month-calendar");
		return(
			<div className={dayClass}>{i}</div>
		)
		
	}
	
	render(){
		const startDayNum = this.props.startDayNum; //monday = 0, sunday = 6
		const numDaysInMonth = 31;
		let daysInMonth = [];
		let dayNumOfDay = startDayNum;
		let weekInMonth = [];
		for(var i = 0; i < startDayNum; i++){
			weekInMonth.push(0);
		}
		for(var i = 0; i < numDaysInMonth; i++){
			console.log(daysInMonth);
			weekInMonth.push(i+1);
			dayNumOfDay++;
			if(dayNumOfDay == 7){
				dayNumOfDay = 0;
				daysInMonth.push(weekInMonth);
				weekInMonth = [];
			}
		}
		daysInMonth.push(weekInMonth);
		console.log(daysInMonth);
		const numRows = daysInMonth.length;
		let hello = [];
		
		for(i = 0; i < numRows; i++){
			hello[i] = daysInMonth[i].map((k) => {
				return this.renderDay(k);
			});
		}
		
		const byee = hello.map((k) => {
			
			return (<div className="month-calendar-row">{k}</div>);
		});
		
		console.log(hello);
		// const moves = history.map((step, move) => {
		// 	const desc = move ?
		// 		'Go to move #' + move :
		// 		'Go to game start';
		// 	return (
		// 		<li>
		// 			<button onClick={() => this.jumpTo(move)}>{desc}</button>
		// 		</li>
		// 	);
		// });
		
		return(
			<div>{byee}</div>
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

class VacationCalendarView extends React.Component{
	render(){
		return(
			<div className="month-calendar">
				<div className="day-name-row">
					<div className="day-in-month-calendar">월</div>
					<div className="day-in-month-calendar">화</div>
					<div className="day-in-month-calendar">수</div>
					<div className="day-in-month-calendar">목</div>
					<div className="day-in-month-calendar">금</div>
					<div className="day-in-month-calendar">토</div>
					<div className="day-in-month-calendar">일</div>
				</div>
				<MonthCalendar
					startDayNum={2}	
				/>

				<button onClick={this.props.getUserData}>here</button>
			</div>
		);
	}
}

class VacationPage extends React.Component{
	constructor(props){
		super(props);
		
		// this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		this.getUserData=this.getUserData.bind(this);
		this.state={
			isGettingUserData:true
		}
		
	}
	
	async getUserData(){
		const token = localStorage.getItem('token');
		console.log(token);
		
		try{
			let getUsers = await
			vacationPageAxios.get('https://goondae-server.run.goorm.io/users/me/'+token); //req.params.token
			console.log(getUsers);
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
	}
	
	componentDidMount(){
		var self = this;
		vacationPageAxios.interceptors.request.use(function (config) {
			self.setState({
				isGettingUserData: true
			});
			return config;

			}, function (error) {
				console.log('error request');
				self.setState({
					isGettingUserData: false
				});
				return Promise.reject(error);
		});
		vacationPageAxios.interceptors.response.use(function (response) {
			self.setState({
				isGettingUserData: false
			});

			return response;
			}, function (error) {
				self.setState({
					isGettingUserData: false
				});
				return Promise.reject(error);
		});
	}
	
	
	render(){
		return(
			<div className="month-calendar">
				<div className="day-name-row">
					<div className="day-in-month-calendar">월</div>
					<div className="day-in-month-calendar">화</div>
					<div className="day-in-month-calendar">수</div>
					<div className="day-in-month-calendar">목</div>
					<div className="day-in-month-calendar">금</div>
					<div className="day-in-month-calendar">토</div>
					<div className="day-in-month-calendar">일</div>
				</div>
				<MonthCalendar
					startDayNum={2}	
				/>

				<button onClick={this.getUserData}>here</button>
			</div>
		);
	}
}

export default VacationPage;