import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/font-addition.css';
import './css/goonbokmu-content.css';
import './css/vanillacalendar.css';
import './css/react-calendar.css';
import './css/react-calendar-override.css';
import './css/bootstrap-4.0.0/bootstrap.css';
import PageHeader from './js/navBar.js';
import ServiceTypeBtnsGroup from './js/serviceTypeBtns.js';
import CalendarInput from './js/calendarInput.js';
import ResultBox from './js/resultBox.js';
import LoginModal from './js/loginModal.js';
import SignupModal from './js/signupModal.js';
import axios from 'axios';
import Modal from 'react-modal';



Modal.setAppElement('#root');
class CalculatorPage extends React.Component{
	constructor(props){
		super(props);
		
		this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		this.onClickDay = this.onClickDay.bind(this);
		this.onSwitcherClick = this.onSwitcherClick.bind(this);
		this.openLoginModal = this.openLoginModal.bind(this);
    	// this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
    	this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
    	// this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
    	this.closeSignupModal = this.closeSignupModal.bind(this);
		
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();
		
		this.serviceTypes = ["육군", "해군", "공군", "해병대", "의경", "해경", "소방원", "공익"];
		this.numMonths = [21, 23, 24, 21, 21, 23, 23, 24];
		this.shortenedNumMonths = [18, 20, 22, 18, 18, 20, 20, 21]; 
		this.perRankMonthlyPay2017 = [163000, 176400, 195000, 216000];
		this.perRankMonthlyPay2018 = [306100, 331300, 366200, 405700];
		this.perRankMonthlyPay2020 = [510200, 552200, 610400, 676100];
		// this props can be in the children components as they are not needed in the other sibling components
		
		
		this.numTypes = 8;
		
		
		this.state = {
			// numTypes : 8,
			// serviceTypes : ["육군", "해군", "공군", "해병", "의경", "해경", "소방원", "사회복무요원"],	
			// numMonths : [21, 23, 24, 21, 21, 23, 23, 24],
			selectedType : 0,
			// selectedDate : [dd, mm, yyyy],
			selectedDate : today,
			isDaysNotWolgeup: true,
			loginModalIsOpen: false,
			signupModalIsOpen: false
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
	
	typeBtnClickHandler(typeNum) {
		console.log(typeNum);
		this.setState({
			selectedType : typeNum
		});
		console.log(this.state.selectedType);
		
	}
	
	onSwitcherClick(){
		const isDaysNotWolgeup = this.state.isDaysNotWolgeup;
		
		this.setState({
			isDaysNotWolgeup : !isDaysNotWolgeup
		});
	}
	
	onClickDay(selectedDate){
		console.log("selected Date " , selectedDate);
		// var dd = selectedDate.getDate();
		// var mm = selectedDate.getMonth() + 1; //January is 0!
		// var yyyy = selectedDate.getFullYear();
		
		// console.log(dd, mm, yyyy);
		
		// var formattedSelectedDate = [dd, mm, yyyy];
		
		// this.setState({selectedDate:formattedSelectedDate});
		this.setState({selectedDate:selectedDate});
		console.log(this.state.selectedDate);
	}
	
	componentDidMount() {
		console.log('hello');
			// let getUsers = () => {
			// axios.post('https://goondae-server.run.goorm.io/users/login', {
			// 	email: 'johnjin5@email.com',
			// 	password: '123z123z'
				
			// }).then(response => {
			// console.log(response);
			// });
			// };

			// getUsers();

    }
	
	render(){
		return(
			<div>
				<PageHeader 
					numMonths={this.numMonths}
					isDaysNotWolgeup={this.state.isDaysNotWolgeup}
					onClick={this.onSwitcherClick}
					onClickOpenLoginModal={this.openLoginModal}
					onClickOpenSignupModal={this.openSignupModal}
					/>
				<SignupModal
					signupModalIsOpen={this.state.signupModalIsOpen}
					closeSignupModal={this.closeSignupModal}
					contentLabel="Signup Modal"
					subtitle={this.subtitle}
					selectedDate={this.state.selectedDate}
				/>
				<LoginModal
					loginModalIsOpen={this.state.loginModalIsOpen}
					onAfterLoginOpen={this.afterOpenLoginModal}
					closeLoginModal={this.closeLoginModal}
					contentLabel="Login Modal"
					subtitle={this.subtitle}
				/>
				<div id="contents">
					<div className="title-box">입대일을 선택해주세요</div>
					
					<CalendarInput 
						onClick = {this.onClickDay}
						/>
					
					<ServiceTypeBtnsGroup 
						numTypes={this.numTypes}
						serviceTypes={this.serviceTypes}
						numMonths={this.numMonths}
						selectedType = {this.state.selectedType}
						onClick={i => this.typeBtnClickHandler(i)}
						/>
					
					<ResultBox
						isDaysNotWolgeup={this.state.isDaysNotWolgeup}
						selectedDate={this.state.selectedDate}
						selectedType={this.state.selectedType}
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

ReactDOM.render(
  <CalculatorPage />,
  document.getElementById('root')
);