import React from 'react';
// import Calendar from 'react-calendar/dist/entry.nostyle';
import Calendar from 'react-calendar';
 
class CalendarInput extends React.Component {
	constructor(props){
		super(props);
		var minDate = new Date('January 1, 2010');
		var maxDate = new Date('January 1, 2025');
		
		this.state = {
			minDate: minDate,
			maxDate: maxDate,
		};
		
	}
	
	
	render() {
		return (
			<div className="cal goondae-cal">
				<Calendar
					maxDate={this.state.maxDate}
					minDate={this.state.minDate}
					onChange={this.props.onClick}
					value={this.props.selectedDate}
					onClickDay={this.onClickDay}
				/>
			</div>
		);
	}
}

export default CalendarInput;