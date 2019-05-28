import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/font-addition.css';
import './css/goonbokmu-content.css';
import './css/vanillacalendar.css';
import './css/react-calendar.css';
import './css/react-calendar-override.css';
import './css/bootstrap-4.0.0/bootstrap.css';
import './css/nav-icon-animation.css';
import './css/menu-side-bar.css';
import PageHeader from './js/navBar.js';
import ServiceTypeBtnsGroup from './js/serviceTypeBtns.js';
import CalendarInput from './js/calendarInput.js';
import ResultBox from './js/resultBox.js';
import LoginModal from './js/loginModal.js';
import SignupModal from './js/signupModal.js';
import LoadingScreen from './js/loading.js';
import CalculatorPage from './js/calculatorPage.js';
import VacationPage from './js/vacationPage.js';
import MenuBar from './js/menuSideBar.js';
import axios from 'axios';
import Modal from 'react-modal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Think about whether all the states needed in different pages (that is shared with nav bar) should be in the main page
//Maybe there's another method. Right now, since the main page only passes today to nav bar, things aren't calculated properly

Modal.setAppElement('#root');
const logoutAxios = axios.create();
class MainPage extends React.Component{
	constructor(props){
		super(props);
		this.openLoginModal = this.openLoginModal.bind(this);
    	this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
		this.closeSignupModal = this.closeSignupModal.bind(this);
		this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
		this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		this.onClickDay = this.onClickDay.bind(this);
		this.onSwitcherClick = this.onSwitcherClick.bind(this);
		this.toggleMenuBar = this.toggleMenuBar.bind(this);
		this.returnCalculatorPage = this.returnCalculatorPage.bind(this);
		this.returnMainPage = this.returnMainPage.bind(this);
		this.updatePageNum = this.updatePageNum.bind(this);
		
		var today = new Date();
		
		this.state = {
			selectedType : 0,
			selectedDate : today,
			loginModalIsOpen: false,
			signupModalIsOpen: false,
			isLoggedIn: false,
			isLoading: false,
			isMenuBarOpen: false,
			pageNum: this.returnPageCodeBasedOnURL()
		};
	}
	
	toggleMenuBar(){
		// console.log('menu btn clicked');
		this.setState({
			isMenuBarOpen: !this.state.isMenuBarOpen
		});
	}
	
	onClickDay(selectedDate){
		console.log("!!!!!!!!!!!!!!!!!!! " , selectedDate);
		// var dd = selectedDate.getDate();
		// var mm = selectedDate.getMonth() + 1; //January is 0!
		// var yyyy = selectedDate.getFullYear();
		
		// console.log(dd, mm, yyyy);
		
		// var formattedSelectedDate = [dd, mm, yyyy];
		
		// this.setState({selectedDate:formattedSelectedDate});
		this.setState({selectedDate:selectedDate});
		console.log(this.state.selectedDate);
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
	closeLoginModal() {
		this.setState({loginModalIsOpen: false});
	}
	
	
	async logoutCurrentUser(){
		console.log('logging out');
		console.log(localStorage.getItem('token'));
		const token = localStorage.getItem('token');
		try{
			let getLogoutUser = await
			logoutAxios.post('https://goondae-server.run.goorm.io/users/logoutAll', {
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
		var self = this;
		logoutAxios.interceptors.request.use(function (config) {

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
		logoutAxios.interceptors.response.use(function (response) {

			// spinning hide
			// UPDATE: Add this code to hide global loading indicator
			// document.body.classList.remove('loading-indicator');
			console.log('finished');
			self.setState({
				isLoading: false,
				isLoggedIn: false
			});

			return response;
			}, function (error) {
				console.log('error response');
				self.setState({
					isLoading: false
				});
				return Promise.reject(error);
		});

    }

	/*************Render components ************/
	returnCalculatorPage(){
		// this.setState({
		// 	pageNum:5
		// });
		return <CalculatorPage 
						onClickDay={this.onClickDay}
						typeBtnClickHandler={i => this.typeBtnClickHandler(i)}
						onSwitcherClick={this.onSwitcherClick}
						selectedDate={this.state.selectedDate}
						selectedType={this.state.selectedType}
						isDaysNotWolgeup={this.state.isDaysNotWolgeup}
					/> 
	}
	returnVacationPage(){
		return <VacationPage/>
	}
	
	returnMainPage(){
		// this.setState({
		// 	pageNum:0
		// });
		return <h2> Main Page </h2>
	}
	
	returnPageCodeBasedOnURL(){
		const pageString = window.location.pathname;
		let resultString = String(pageString.match(/^\/[a-zA-Z]+/g));
		resultString = resultString.substring(1,);
		console.log(resultString);
		switch (resultString){
			case "":
				return 0;
				break;
			case "vacation":
				return 1;
				break;
			case "futureMe":
				return 2;
				break;
			case "meal":
				return 3;
				break;
			case "openBoard":
				return 4;
				break;
			case "calculator":
				return 5;
				break;
			default:
				return -1;
				break;
		}
			
				
	}
	
	updatePageNum = (ev) => {
		let pathString = ev.target.getAttribute('value');
		console.log(ev.target.getAttribute('value'));
		let pageNum = -1;
		switch (pathString){
			case "":
				pageNum = 0;
				break;
			case "vacation":
				pageNum = 1;
				break;
			case "futureMe":
				pageNum = 2;
				break;
			case "meal":
				pageNum = 3;
				break;
			case "openBoard":
				pageNum = 4;
				break;
			case "calculator":
				pageNum = 5;
				break;
			default:
				pageNum = -1;
				break;
		}
		this.setState({
			pageNum:pageNum,
			isMenuBarOpen: !this.state.isMenuBarOpen
			
		});
	}
	
	render(){
		
		return(
			<Router>
				<div id="mainPageContainer">
					<MenuBar
						isMenuBarOpen={this.state.isMenuBarOpen}
						toggleMenuBar={this.toggleMenuBar}
						updatePageNum={this.updatePageNum}
					/>
					<LoadingScreen
						isLoading={this.state.isLoading}
					/>
					<PageHeader 
						isDaysNotWolgeup={this.state.isDaysNotWolgeup}
						onSwitcherClick={this.onSwitcherClick}
						onClickOpenLoginModal={this.openLoginModal}
						onClickOpenSignupModal={this.openSignupModal}
						onClickLogout={this.logoutCurrentUser}
						toggleMenuBar={this.toggleMenuBar}
						isMenuBarOpen={this.state.isMenuBarOpen}
						pageNum={this.state.pageNum}
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

					<Route path="/calculator/" component={this.returnCalculatorPage}/>
					<Route path="/vacation/" component={this.returnVacationPage}/>
					<Route exact path="/" component={this.returnMainPage}/>
				</div>
			</Router>
		);
	}
	
}
// const logoutAxios = axios.create();
// class CalculatorPage extends React.Component{
// 	constructor(props){
// 		super(props);
		
// 		this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
// 		this.onClickDay = this.onClickDay.bind(this);
// 		this.onSwitcherClick = this.onSwitcherClick.bind(this);
// 		this.openLoginModal = this.openLoginModal.bind(this);
//     	// this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
//     	this.closeLoginModal = this.closeLoginModal.bind(this);
// 		this.openSignupModal = this.openSignupModal.bind(this);
//     	// this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
//     	this.closeSignupModal = this.closeSignupModal.bind(this);
// 		this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
		
		
// 		var today = new Date();
// 		var dd = today.getDate();
// 		var mm = today.getMonth() + 1; //January is 0!
// 		var yyyy = today.getFullYear();
		
// 		this.serviceTypes = ["육군", "해군", "공군", "해병대", "의경", "해경", "소방원", "공익"];
// 		this.numMonths = [21, 23, 24, 21, 21, 23, 23, 24];
// 		this.shortenedNumMonths = [18, 20, 22, 18, 18, 20, 20, 21]; 
// 		this.perRankMonthlyPay2017 = [163000, 176400, 195000, 216000];
// 		this.perRankMonthlyPay2018 = [306100, 331300, 366200, 405700];
// 		this.perRankMonthlyPay2020 = [510200, 552200, 610400, 676100];
// 		// this props can be in the children components as they are not needed in the other sibling components
		
		
// 		this.numTypes = 8;
		
		
// 		this.state = {
// 			// numTypes : 8,
// 			// serviceTypes : ["육군", "해군", "공군", "해병", "의경", "해경", "소방원", "사회복무요원"],	
// 			// numMonths : [21, 23, 24, 21, 21, 23, 23, 24],
// 			selectedType : 0,
// 			// selectedDate : [dd, mm, yyyy],
// 			selectedDate : today,
// 			isDaysNotWolgeup: true,
// 			loginModalIsOpen: false,
// 			signupModalIsOpen: false,
// 			isLoggedIn: false,
// 			isLoading: false
// 		};
// 	}
	
// 	openSignupModal() {
// 		this.setState({signupModalIsOpen: true,
// 					  loginModalIsOpen:false});
// 	}
// 	closeSignupModal(){
// 		this.setState({signupModalIsOpen: false});
// 	}
	
// 	openLoginModal() {
// 		this.setState({loginModalIsOpen: true,
// 					  signupModalIsOpen: false});
// 	}

// 	afterOpenLoginModal() {
// 		// references are now sync'd and can be accessed.
// 		this.subtitle.style.color = '#f00';
// 	}

// 	closeLoginModal() {
// 		this.setState({loginModalIsOpen: false});
// 	}
	
// 	typeBtnClickHandler(typeNum) {
// 		console.log(typeNum);
// 		this.setState({
// 			selectedType : typeNum
// 		});
// 		console.log(this.state.selectedType);
		
// 	}
	
// 	onSwitcherClick(){
// 		const isDaysNotWolgeup = this.state.isDaysNotWolgeup;
		
// 		this.setState({
// 			isDaysNotWolgeup : !isDaysNotWolgeup
// 		});
// 	}
	
// 	async logoutCurrentUser(){
// 		console.log('logging out');
// 		console.log(localStorage.getItem('token'));
// 		const token = localStorage.getItem('token');
// 		try{
// 			let getLogoutUser = await
// 			logoutAxios.post('https://goondae-server.run.goorm.io/users/logout', {
// 				token: token
// 			});
// 			console.log(getLogoutUser);
// 			localStorage.removeItem('token');
// 			this.setState({
// 				isLoggedIn: false
// 			});
			
// 		}catch(e){
// 			console.log(e);
// 		}
// 		console.log(this.state.isLoggingOut);
// 	}
	
// 	onClickDay(selectedDate){
// 		console.log("selected Date " , selectedDate);
// 		// var dd = selectedDate.getDate();
// 		// var mm = selectedDate.getMonth() + 1; //January is 0!
// 		// var yyyy = selectedDate.getFullYear();
		
// 		// console.log(dd, mm, yyyy);
		
// 		// var formattedSelectedDate = [dd, mm, yyyy];
		
// 		// this.setState({selectedDate:formattedSelectedDate});
// 		this.setState({selectedDate:selectedDate});
// 		console.log(this.state.selectedDate);
// 	}
	
// 	componentDidMount() {
// 		console.log('hello');
// 			// let getUsers = () => {
// 			// axios.post('https://goondae-server.run.goorm.io/users/login', {
// 			// 	email: 'johnjin5@email.com',
// 			// 	password: '123z123z'
				
// 			// }).then(response => {
// 			// console.log(response);
// 			// });
// 			// };

// 			// getUsers();
// 		var self = this;
// 		logoutAxios.interceptors.request.use(function (config) {

// 			// spinning start to show
// 			// UPDATE: Add this code to show global loading indicator
// 			// document.body.classList.add('loading-indicator');
// 			self.setState({
// 				isLoading: true
// 			});
// 			console.log('started');
// 			return config;

// 			}, function (error) {
// 				console.log('error request');
// 				self.setState({
// 					isLoading: false
// 				});
// 				return Promise.reject(error);
// 		});
// 		logoutAxios.interceptors.response.use(function (response) {

// 			// spinning hide
// 			// UPDATE: Add this code to hide global loading indicator
// 			// document.body.classList.remove('loading-indicator');
// 			console.log('finished');
// 			self.setState({
// 				isLoading: false,
// 				isLoggedIn: false
// 			});

// 			return response;
// 			}, function (error) {
// 				console.log('error response');
// 				self.setState({
// 					isLoading: false
// 				});
// 				return Promise.reject(error);
// 		});

//     }
	
// 	render(){
// 		return(
// 			<div>
// 				<LoadingScreen
// 					isLoading={this.state.isLoading}
// 					/>
// 				<PageHeader 
// 					numMonths={this.numMonths}
// 					isDaysNotWolgeup={this.state.isDaysNotWolgeup}
// 					onClick={this.onSwitcherClick}
// 					onClickOpenLoginModal={this.openLoginModal}
// 					onClickOpenSignupModal={this.openSignupModal}
// 					onClickLogout={this.logoutCurrentUser}
// 					/>				
// 				<SignupModal
// 					signupModalIsOpen={this.state.signupModalIsOpen}
// 					closeSignupModal={this.closeSignupModal}
// 					contentLabel="Signup Modal"
// 					subtitle={this.subtitle}
// 					selectedDate={this.state.selectedDate}
// 				/>
// 				<LoginModal
// 					loginModalIsOpen={this.state.loginModalIsOpen}
// 					onAfterLoginOpen={this.afterOpenLoginModal}
// 					closeLoginModal={this.closeLoginModal}
// 					contentLabel="Login Modal"
// 					subtitle={this.subtitle}
// 				/>
// 				<div id="contents">
// 					<div className="title-box">입대일을 선택해주세요</div>
					
// 					<CalendarInput 
// 						onClick = {this.onClickDay}
// 						/>
					
// 					<ServiceTypeBtnsGroup 
// 						numTypes={this.numTypes}
// 						serviceTypes={this.serviceTypes}
// 						numMonths={this.numMonths}
// 						selectedType = {this.state.selectedType}
// 						onClick={i => this.typeBtnClickHandler(i)}
// 						/>
					
// 					<ResultBox
// 						isDaysNotWolgeup={this.state.isDaysNotWolgeup}
// 						selectedDate={this.state.selectedDate}
// 						selectedType={this.state.selectedType}
// 						numMonths={this.numMonths}
// 						shortenedNumMonths={this.shortenedNumMonths}
// 						perRankMonthlyPay2017={this.perRankMonthlyPay2017}
// 						perRankMonthlyPay2018={this.perRankMonthlyPay2018}
// 						perRankMonthlyPay2020={this.perRankMonthlyPay2020}
// 						/>
// 				</div>
// 			</div>
// 		);
// 	}
// }

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
);