import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/index.css';
import '../../css/vacation-page.css';
import '../../css/vacation-overview.css';
import CalendarInput from '../../js/calendarInput.js';
import LoadingScreen from '../loading.js';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import Modal from 'react-modal';
import moment from 'moment'

const saveButtonAxios = axios.create();
const userDataAxios = axios.create(); 
moment.locale('kr');
class SaveButton extends React.Component{
	async addVacation(){
		const token = localStorage.getItem('token');
		try{
			let user = await
			userDataAxios.patch('https://goondae-server.run.goorm.io/users/me', {
				vacation: this.props.vacations
			});
			//https://www.npmjs.com/package/react-date-range
		}catch(e){
			console.log(e);
		}
	}
	async saveMealUnitChange(){
		const token = localStorage.getItem('token');
		try{
			let getLogoutUser = await
			userDataAxios.patch('https://goondae-server.run.goorm.io/users/me', {
				token: token,
				mealUnit: this.state.mealUnit
			});
			
		}catch(e){
			console.log(e);
		}
	}
	OnClick(){
		
	}
	render(){
		return(<div></div>);
	}
}

class DateRangeSelector extends React.Component{
	constructor(props){
		super(props);
		this.state={
			startDate: null,
			endDate: null
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.addVacation = this.addVacation.bind(this);
	}
	handleSelect(date){
        console.log(date); // Momentjs object
		this.setState({endDate: date.endDate,
					  startDate: date.startDate});
    }
	async addVacation(){
		const token = localStorage.getItem('token');
		// console.log(this.state.startDate, this.state.endDate);
		try{
			let user = await
			userDataAxios.post('https://goondae-server.run.goorm.io/vacationDate', {
				startDate: this.state.startDate,
				endDate: this.state.endDate,
				token: token
			});
			
			console.log(user);
			//TODO: react state update error
			this.props.saveVac(user.data);
			
			this.props.onSaveVac();
			//!!can't perform react state update on unmounted component !!!!!!
			//https://www.npmjs.com/package/react-date-range
		}catch(e){
			console.log(e);
		}
	}
	saveVacation(){
		
	}
	render(){
		return(<div className="date-range-selector">
				<DateRange
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
					lang="ko"
                />
				<button className="add-vac-btn" onClick={this.addVacation}>저장</button>
			</div>)
	}
}


class SingleVacationDaySlot extends React.Component{
	
	getColorFromVacationType(vacType){
		switch (vacType){
			case 0:
				return "background-orange";
			case 1:
				return "background-purple";
			case 2:
				return "background-green";
			case 3:
				return "background-yellow";
			case 4:
				return "background-red";
			default:
				return "";
		}
			
	}
	render(){
		const slotColor = this.getColorFromVacationType(this.props.vacType);
		
		return(<div className="vacation-day-slot"></div>);
	}
}

class VacationDateRow extends React.Component{
	constructor(props){
		super(props);
		this.state={};
	}
	handleSelect(range){
        console.log(range);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
    }
	
	dateToKorean(startDate, endDate){
		const startMomentDate = moment(startDate).format('YYYY년 MM월 DD일');
		const endMomentDate = moment(endDate).format('YYYY년 MM월 DD일');
		return startMomentDate + ' ~ ' + endMomentDate;
	
		
	}
	
	render(){
		var cal = null;
		var text = ""
		if(this.props.vac){
			console.log(this.props.vac);
			console.log(moment.locale('ko'))
			text = this.dateToKorean(this.props.vac.startDate, this.props.vac.endDate);
		}
		
		return(<div className="vacation-date-range-row" >{text}</div>);
	}
}

class SingleVacationRow extends React.Component{
	renderSingleSlot(i){
		return(<SingleVacationDaySlot 
				   key={i} 
				   ></SingleVacationDaySlot>);
	}
	renderDateRange(){
		// console.log(this.props.vacationDate.startDate);
		return(<VacationDateRow
				   count={this.props.key}
				   vac={this.props.vacationDate}
				   ></VacationDateRow>);
	}
	render(){
		const vacationSlots = [];
		// for(var i = 0; i < 15; i++){
		// 	vacationSlots.push(this.renderSingleSlot(i));
		// }
		vacationSlots.push(this.renderDateRange());
		vacationSlots.push(<div className="vacation-add-btn" key="15"></div>);
		
		const rowStyle = {height: 'calc(100% / '+ this.props.numRows +')'};
		return(<div className="vacation-days-row" style={rowStyle}><div className="vacation-rank-slot" > </div>
				{vacationSlots} </div>)
	}
}


class OverviewRankBar extends React.Component{
	
	renderSingleRankSlot(i){
		return (<div className="vacation-rank-slot" key={i}></div>);
	}
	
	render(){
		
		var serviceType = 0;
		
		
		return(
			<div className="vacation-rank-bar">
					
			
			</div>);
	}
}

class OverviewTotalDaysViewer extends React.Component{
	renderSingleRow(i, numRows, vac){
		
		return(<SingleVacationRow 
				   key={i} 
				   numRows={numRows}
				   vacationDate={vac}>
			</SingleVacationRow>)
	}
	
	render(){
		let vacationRows = [];
		const numRows = this.props.numMonths;
		for(var i = 0; i < numRows; i++){
			
			if(this.props.vacs){
				vacationRows.push(this.renderSingleRow(i, numRows, this.props.vacs[i]));
			}
			else{
				vacationRows.push(this.renderSingleRow(i, numRows, null));
			}
			
		}
		
		
		return(
			<div className="vacation-total-days-viewer">
				{vacationRows}
			</div>
		);
	}
}

class VacationDateRangePicker extends React.Component{
	
}



class VacationOverview extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			startMonth : 3, // 1~12
			serviceType: 0, // 0: army, 1: airforce etc
			numMonthService : 20, // calculate by subtracting start date from end date.
			vacationDatesList: null,
			user:null,
			vac: null,
			isLoading: false
			
		}
		// this.toggleOpenCal = this.toggleOpenCal.bind(this);
		this.getVacData = this.getVacData.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.deleteAllVacs = this.deleteAllVacs.bind(this);
		this.onSaveVac = this.onSaveVac.bind(this);
		this.saveVac = this.saveVac.bind(this);
		this.finishedLoading = this.finishedLoading.bind(this);
	}
	
	renderRowOfVacation(){
		return <div></div>
	}
	
	async deleteAllVacs(){
		const token = localStorage.getItem('token');
		try{
			let vac = await userDataAxios.delete('https://goondae-server.run.goorm.io/vacationDatesAll/'+ token);
			console.log(vac);
			if(vac.status == 200){
				this.setState({
					vac: null
				});
			}
			
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
	}
	
	async getUserData(){
		
		const token = localStorage.getItem('token');
		// console.log(token);
		
		try{
			let user = await userDataAxios.get('https://goondae-server.run.goorm.io/users/me/'+token); //req.params.token
			// console.log(localStorage.getItem('token'));
			// console.log(user.data.startDate);
			// return getUsers;
			this.setState({
				user:user.data
			});
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
	}
	
	async getVacData(){
		const token = localStorage.getItem('token');
		// console.log(token);
		
		try{
			let vac = await userDataAxios.get('https://goondae-server.run.goorm.io/vacationDates/'+token); //req.params.token
			// console.log(vac);
			this.setState({
				vac: vac.data
			});
			
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
	}
	
	//TODO: react state update error
	saveVac(vacData){
		this.setState({
			vac: this.state.vac + vacData
		});
	}
	onSaveVac(){
		this.getVacData();
	}
	
	finishedLoading(){
		this.setState({
			isLoading: false
		});
	}
	
	
	componentDidMount(){
		console.log(this.props.isLoggedIn);
		if(localStorage.getItem('token')){
			console.log("HELLOOOO COMPONENTDIDMOUNT HERE")
			this.getUserData();
			this.getVacData();
		}
		
		var self = this;
		
		userDataAxios.interceptors.request.use(function (config) {

			// spinning start to show
			// UPDATE: Add this code to show global loading indicator
			// document.body.classList.add('loading-indicator');
			self.setState({
				isLoading: true
			});
			console.log('started');
			return config;

			}, function (error) {
				console.log('error request');
				self.setState({
					isLoading: false
				});
				return Promise.reject(error);
		});
		userDataAxios.interceptors.response.use(function (response) {

			// spinning hide
			// UPDATE: Add this code to hide global loading indicator
			// document.body.classList.remove('loading-indicator');
			console.log('finished');
			// self.setState({
			// 	isLoading: false
			// });

			return response;
			}, function (error) {
				console.log('error response');
				self.setState({
					isLoading: false
				});
				return Promise.reject(error);
		});
	}
	
	render(){
		// console.log(this.state.user);
		// console.log(this.state.vac);
		for(var i = 0; i < this.state.numMonthService; i++){
			
		}
		// console.log(this.state.num)
		
		const loading = this.state.isLoading || this.props.isLoggingIn;
		return(
			
			<div className="vacation-overview-container">
					<LoadingScreen
						isLoading={loading} 
					/>
					<OverviewTotalDaysViewer
						startMonth={this.state.startMonth}
						numMonths={this.state.numMonthService}
						vacs={this.state.vac}
					/>
					<DateRangeSelector
						onSaveVac={this.onSaveVac}
						saveVac = {this.saveVac}/>

					<button onClick={this.getUserData}>here</button>
					<button onClick={this.deleteAllVacs}>delete all</button>
				
				
			</div>
		);
	}
}
export default VacationOverview;