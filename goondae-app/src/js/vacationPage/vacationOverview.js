import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/index.css';
import '../../css/vacation-page.css';
import '../../css/vacation-overview.css';
import CalendarInput from '../../js/calendarInput.js';
import axios from 'axios';
import Modal from 'react-modal';

const saveButtonAxios = axios.create();
class SaveButton extends React.Component{
	OnClick(){
		
	}
	render(){
		return(<div></div>);
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

class SingleVacationRow extends React.Component{
	renderSingleSlot(i){
		return(<SingleVacationDaySlot key={i}></SingleVacationDaySlot>);
	}
	render(){
		const vacationSlots = [];
		for(var i = 0; i < 15; i++){
			vacationSlots.push(this.renderSingleSlot(i));
		}
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
	renderSingleRow(i, numRows){
		
		return(<SingleVacationRow 
				   key={i} 
				   numRows={numRows}>
			</SingleVacationRow>)
	}
	
	render(){
		let vacationRows = [];
		console.log(this.props.numMonths);
		const numRows = this.props.numMonths;
		for(var i = 0; i < numRows; i++){
			console.log(i);
			vacationRows.push(this.renderSingleRow(i, numRows));
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
			vacationDatesList: null
			
		}
	}
	
	renderRowOfVacation(){
		return <div></div>
	}
	
	render(){
		for(var i = 0; i < this.state.numMonthService; i++){
			
		}
		console.log(this.state.num)
		return(
			
			<div className="vacation-overview-container">
					<OverviewTotalDaysViewer
						startMonth={this.state.startMonth}
						numMonths={this.state.numMonthService}
					/>

					<button onClick={this.getUserData}>here</button>
			</div>
		);
	}
}
export default VacationOverview;