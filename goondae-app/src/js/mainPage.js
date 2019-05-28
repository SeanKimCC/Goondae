import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import '../css/font-addition.css';
import '../css/goonbokmu-content.css';
import '../css/vanillacalendar.css';
import '../css/react-calendar.css';
import '../css/react-calendar-override.css';
import '../css/bootstrap-4.0.0/bootstrap.css';
import PageHeader from '../js/navBar.js';
import ServiceTypeBtnsGroup from '../js/serviceTypeBtns.js';
import CalendarInput from '../js/calendarInput.js';
import ResultBox from '../js/resultBox.js';
import LoginModal from '../js/loginModal.js';
import SignupModal from '../js/signupModal.js';
import LoadingScreen from '../js/loading.js';
import axios from 'axios';
import Modal from 'react-modal';



class MainPage extends React.Component{
	constructor(props){
		super(props);
		
		// this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		
	}
	
	
	render(){
		return(
			<div>
				
			</div>
		);
	}
}

export default MainPage;