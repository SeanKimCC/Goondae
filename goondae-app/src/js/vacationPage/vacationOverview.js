import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/index.css';
import '../../css/vacation-page.css';
import '../../css/vacation-overview.css';
import CalendarInput from '../../js/calendarInput.js';
import axios from 'axios';
import Modal from 'react-modal';

class OverviewRankBar extends React.Component{
	
	
	render(){
		var serviceType = 0;
		
		
		return(
			<div className="vacation-rank-bar">
					
			
			</div>);
	}
}

class OverviewTotalDaysViewer extends React.Component{
	render(){
		return(
			<div className="vacation-total-days-viewer">
				
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
			vacationDatesList: null
			
		}
	}
	
	renderRowOfVacation(){
		return <div></div>
	}
	
	render(){
		for(var i = 0; i < this.state.numMonthService; i++){
			
		}
		return(
			
			<div className="vacation-overview-container">
					<OverviewRankBar 
						startMonth={this.state.startMonth}
						numMonths={this.state.numMomthService}
					/>
					<OverviewTotalDaysViewer
						numMonths={this.state.numMomthService}
					/>

					<button onClick={this.getUserData}>here</button>
			</div>
		);
	}
}
export default VacationOverview;