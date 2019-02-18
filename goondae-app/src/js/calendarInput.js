import React from 'react';
// import Calendar from 'react-calendar/dist/entry.nostyle';
import Calendar from 'react-calendar';
 
class CalendarInput extends React.Component {
	constructor(props){
		super(props);
		var minDate = new Date('January 1, 2010');
		var maxDate = new Date('January 1, 2025');
		
		this.state = {
			date: new Date(),
			day: new Date(),
			minDate: minDate,
			maxDate: maxDate,
		};
		
		// this.onChange = this.onChange.bind(this);
	}
	
	// onChange (date){
	// 	this.setState({ date });
	// }
	
	// onChange = date => this.setState({ date });\
	
// 	onChange(date){
// 		console.log(date);
// 		this.setState({date:date});
// 	}

	// // onClickDay = day => this.setState({day});
	// onClickDay(date) {
	// 	console.log(date);
	// 	this.setState({day:date});
	// }


	render() {
		return (
			<div className="cal goondae-cal">
				<Calendar
					maxDate={this.state.maxDate}
					minDate={this.state.minDate}
					onChange={this.props.onClick}
					value={this.state.date}
					onClickDay={this.onClickDay}
				/>
			</div>
		);
	}
}

export default CalendarInput;