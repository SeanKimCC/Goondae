import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import '../css/index.css';
import '../css/font-addition.css';
import '../css/goonbokmu-content.css';
import '../css/celeb-page.css';
import '../css/bootstrap-4.0.0/bootstrap.css';

// var json = require('../json/2019-june-meal.json'); 

class CelebrityPage extends React.Component{
	handleChange(selectedOption) {
		this.props.handleMealUnitChange(selectedOption);
	};
	
	render() {
		
		return(
			<div id="celebContainer">
				
			</div>
		);
	}
}

export default CelebrityPage;