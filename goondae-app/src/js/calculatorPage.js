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



// Modal.setAppElement('#root');
const logoutAxios = axios.create();
class CalculatorPage extends React.Component{
	constructor(props){
		super(props);
		
		// this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		// this.onClickDay = this.onClickDay.bind(this);
		// this.onSwitcherClick = this.onSwitcherClick.bind(this);
		this.openLoginModal = this.openLoginModal.bind(this);
    	// this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
    	this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
    	// this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
    	this.closeSignupModal = this.closeSignupModal.bind(this);
		this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
		
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();
		
		this.serviceTypes = ["육군", "해군", "공군", "해병대", "의경", "해경", "소방원", "공익"];
		this.numMonths = [21, 23, 24, 21, 21, 23, 23, 24];
		this.shortenedNumMonths = [18, 20, 22, 18, 18, 20, 20, 21]; 
		this.perRankMonthlyPay2017 = [163000, 176400, 195000, 216000];
		this.perRankMonthlyPay2018 = [306100, 331300, 366200, 405700];
		this.perRankMonthlyPay2020 = [408100, 441700, 488200, 504900];
		// this props can be in the children components as they are not needed in the other sibling components
		
		
		this.numTypes = 8;
		
		
		this.state = {
			loginModalIsOpen: false,
			signupModalIsOpen: false,
			isLoggedIn: false,
			isLoading: false
		};
	}
	
	openSignupModal() {
		this.setState({signupModalIsOpen: true,
					  loginModalIsOpen:false});
	}
	closeSignupModal(){
		this.setState({signupModalIsOpen: false});
	}
	
	openLoginModal() {
		this.setState({loginModalIsOpen: true,
					  signupModalIsOpen: false});
	}

	afterOpenLoginModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeLoginModal() {
		this.setState({loginModalIsOpen: false});
	}
	
	async logoutCurrentUser(){
		console.log('logging out');
		console.log(localStorage.getItem('token'));
		const token = localStorage.getItem('token');
		try{
			let getLogoutUser = await
			logoutAxios.post('https://goondae-server.run.goorm.io/users/logout', {
				token: token
			});
			console.log(getLogoutUser);
			localStorage.removeItem('token');
			this.setState({
				isLoggedIn: false
			});
			
		}catch(e){
			console.log(e);
		}
		console.log(this.state.isLoggingOut);
	}
	
	render(){
		return(
			<div>
				<div id="contents">
					<div className="title-box">입대일을 선택해주세요</div>
					
					<CalendarInput 
						onClick = {this.props.onClickDay}
						selectedDate = {this.props.selectedDate}
						/>
					
					<ServiceTypeBtnsGroup 
						numTypes={this.numTypes}
						serviceTypes={this.serviceTypes}
						numMonths={this.numMonths}
						selectedType = {this.props.selectedType}
						onClick={i => this.props.typeBtnClickHandler(i)}
						/>
					
					<ResultBox
						isDaysNotWolgeup={this.props.isDaysNotWolgeup}
						selectedDate={this.props.selectedDate}
						selectedType={this.props.selectedType}
						numMonths={this.numMonths}
						shortenedNumMonths={this.shortenedNumMonths}
						perRankMonthlyPay2017={this.perRankMonthlyPay2017}
						perRankMonthlyPay2018={this.perRankMonthlyPay2018}
						perRankMonthlyPay2020={this.perRankMonthlyPay2020}
						/>
				</div>
			</div>
		);
	}
}

export default CalculatorPage;