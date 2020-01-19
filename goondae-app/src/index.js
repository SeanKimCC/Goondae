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
import LoginModal from './js/loginModal.js';
import SignupModal from './js/signupModal.js';
import LoadingScreen from './js/loading.js';
import CalculatorPage from './js/calculatorPage.js';
import {VacationPage} from './js/vacationPage/vacationPage.js';
import SpecialtyPage from './js/specialtyPage.js';
import CelebrityPage from './js/celebPage.js';
import VacationOverview from './js/vacationPage/vacationOverview.js';
import NewVacationOverview from './js/vacationPage/newVacationOverview.js';
import MealPlanPage from './js/mealPlanPage.js';
import MenuBar from './js/menuSideBar.js';
import MainPage from './js/mainPage.js';
import axios from 'axios';
import Modal from 'react-modal';
import { BrowserRouter as Router, Route } from "react-router-dom";

//Think about whether all the states needed in different pages (that is shared with nav bar) should be in the main page
//Maybe there's another method. Right now, since the main page only passes today to nav bar, things aren't calculated properly

Modal.setAppElement('#root');
const logoutAxios = axios.create();
const userDataAxios = axios.create();
class Index extends React.Component{
	constructor(props){
		super(props);
		this.openLoginModal = this.openLoginModal.bind(this);
    	this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
		this.closeSignupModal = this.closeSignupModal.bind(this);
		this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
		this.typeBtnClickHandler = this.typeBtnClickHandler.bind(this);
		this.onClickDay = this.onClickDay.bind(this);
		this.onCalcSwitcherClick = this.onCalcSwitcherClick.bind(this);
		this.toggleMenuBar = this.toggleMenuBar.bind(this);
		this.returnCalculatorPage = this.returnCalculatorPage.bind(this);
		this.returnMainPage = this.returnMainPage.bind(this);
		this.returnVacationOverview = this.returnVacationOverview.bind(this);
		this.returnMealPlanPage = this.returnMealPlanPage.bind(this);
		this.handleMealUnitChange = this.handleMealUnitChange.bind(this);
		this.saveMealUnitChange = this.saveMealUnitChange.bind(this);
		this.updatePageNum = this.updatePageNum.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.loggedIn = this.loggedIn.bind(this);
		this.loggingIn = this.loggingIn.bind(this);
		this.finishedLoggingIn = this.finishedLoggingIn.bind(this);
		this.returnVacationPage = this.returnVacationPage.bind(this);
		this.tokenPlaced = this.tokenPlaced.bind(this);
		this.resetCalcSwitcher = this.resetCalcSwitcher.bind(this);
		
		
		this.state = {
			selectedType : 0,
			// selectedDate : defaultDate,
			selectedDate: new Date(),
			loginModalIsOpen: false,
			signupModalIsOpen: false,
			isLoggedIn: false,
			isLoading: true,
			isLoggingIn: false,
			isMenuBarOpen: false,
			pageNum: this.returnPageCodeBasedOnURL(),
			isDaysNotWolgeup: true,
			// mealUnit: mealUnit,
			mealUnit: 0,
			isLoggedIn: false,
			userLanguage: this.returnLangCode() //0 for korean, 1 for english
		};
	}
	
	toggleMenuBar(){
		// console.log('menu btn clicked');
		this.setState({
			isMenuBarOpen: !this.state.isMenuBarOpen
		});
	}
	
	onClickDay(selectedDate){
		this.setState({selectedDate:selectedDate});
	}
	
	typeBtnClickHandler(typeNum) {
		this.setState({
			selectedType : typeNum
		});
		
	}
	
	onCalcSwitcherClick(){
		const isDaysNotWolgeup = this.state.isDaysNotWolgeup;
		
		this.setState({
			isDaysNotWolgeup : !isDaysNotWolgeup
		});
	}
	resetCalcSwitcher(){
		this.setState({
			isDaysNotWolgeup : true
		});
	}
	
	
	
	openSignupModal() {
		this.setState({signupModalIsOpen: true,
					  loginModalIsOpen:false,
					  isMenuBarOpen:false});
	}
	closeSignupModal(){
		this.setState({signupModalIsOpen: false});
	}
	
	openLoginModal() {
		this.setState({loginModalIsOpen: true,
					  signupModalIsOpen: false,
					  isMenuBarOpen:false});
	}
	closeLoginModal() {
		this.setState({loginModalIsOpen: false});
	}
	
	async getUserData(){
		const token = localStorage.getItem('token');
		
		try{
			let getUsers = await userDataAxios.get('http://localhost:5000/users/me/'+token); //req.params.token
			console.log(localStorage.getItem('token'));
			console.log(getUsers.data.startDate);
			// return getUsers;
			this.setState({
				selectedDate: new Date(getUsers.data.startDate),
				mealUnit: getUsers.data.mealUnit,
				isLoggedIn: true
			});
			localStorage.setItem('mealUnit', this.state.mealUnit);
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
	}
	
	async logoutCurrentUser(){
		console.log('logging out');
		console.log(localStorage.getItem('token'));
		const token = localStorage.getItem('token');
		try{
			let getLogoutUser = await
			userDataAxios.post('http://localhost:5000/users/logoutAll', {
				token: token
			});
			console.log(getLogoutUser);
			localStorage.removeItem('token');
			this.setState({
				isLoggedIn: false,
				selectedDate: new Date(),
				selectedType : 0,
				mealUnit: 0				
			});
			
		}catch(e){
			localStorage.removeItem('token');
			console.log(e);
		}
		console.log(this.state.isLoggingOut);
	}
	loggedIn(){
		this.setState({
			isLoggedIn:true	
		})
	}
	loggedOut(){
		this.setState({
			isLoggedIn:false
		});
	}
	
	
	componentDidMount() {
		
			// let getUsers = () => {
			// axios.post('http://localhost:5000/users/login', {
			// 	email: 'johnjin5@email.com',
			// 	password: '123z123z'
				
			// }).then(response => {
			// console.log(response);
			// });
			// };

			// getUsers();

		const token = localStorage.getItem('token');
		var defaultDate = new Date();
		var mealUnit = 0;
		// localStorage.setItem('startDate', defaultDate);
		if(token){
			//if there is token, get the selected date from local storage
			var userData = this.getUserData();
			console.log("this is user data:", userData);
			defaultDate = new Date(localStorage.getItem('startDate'));
			if(localStorage.getItem('mealUnit')){
				mealUnit = localStorage.getItem('mealUnit');
			}
			if(defaultDate){
				defaultDate = new Date();
			}
		}
		
		var self = this;
		
		
		
		userDataAxios.interceptors.request.use(function (config) {
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
			self.setState({
				isLoading: false
			});

			return response;
			}, function (error) {
				console.log('error response');
				self.setState({
					isLoading: false
				});
				return Promise.reject(error);
		});
		this.setState({isLoading:false});
											   

    }

	/*************Render components ************/
	returnCalculatorPage(){
		// this.setState({
		// 	pageNum:5
		// });
		return <CalculatorPage 
						onClickDay={this.onClickDay}
						typeBtnClickHandler={i => this.typeBtnClickHandler(i)}
						onCalcSwitcherClick={this.onCalcSwitcherClick}
						selectedDate={this.state.selectedDate}
						selectedType={this.state.selectedType}
						isDaysNotWolgeup={this.state.isDaysNotWolgeup}
						userLanguage={this.state.userLanguage}
					/> 
	}
	returnVacationPage(){
		return <VacationPage key={this.state.isLoggingIn}
					userLanguage={this.state.userLanguage}
				   isLoggedIn = {this.state.isLoggedIn}
				   openLoginModal = {this.openLoginModal}
				   />
	}
	returnMealPlanPage(){
		return <MealPlanPage 
				   userLanguage={this.state.userLanguage}
				   handleMealUnitChange={this.handleMealUnitChange} 
				   mealUnit={this.state.mealUnit} 
				   saveMealUnitChange={this.saveMealUnitChange}
				   isOnMainPage={false}/>
	}
	handleMealUnitChange(mealUnit){
		console.log(mealUnit.value);
		this.setState({mealUnit : mealUnit.value});
	}
	async saveMealUnitChange(){
		const token = localStorage.getItem('token');
		try{
			let getLogoutUser = await
			userDataAxios.patch('http://localhost:5000/users/me', {
				token: token,
				mealUnit: this.state.mealUnit
			});
			
		}catch(e){
			console.log("hello catch here");
			console.log(e);
		}
	}
	
	returnMainPage(){
		// this.setState({
		// 	pageNum:0
		// });
		//TODO: fix the component update stuff
		return <MainPage
				   userLanguage={this.state.userLanguage}
				   key ={this.state.isLoggedIn}
				   isLoggedIn={this.state.isLoggedIn}
				   handleMealUnitChange={this.handleMealUnitChange} 
				   mealUnit={this.state.mealUnit} 
				   saveMealUnitChange={this.saveMealUnitChange}
				   openLoginModal={this.openLoginModal}>
		</MainPage>
	}
	
	returnVacationOverview(){
		return <VacationOverview key ={this.state.isLoggedIn} // for loginModal to update vacation component
				   isLoggedIn={this.state.isLoggedIn}
				   isLoggingIn={this.state.isLoggingIn}
				   openLoginModal={this.openLoginModal}
			/>
	}
	returnNewVacationOverview(){
		return <NewVacationOverview/>
	}
	returnSpecialtyPage(){
		return <SpecialtyPage/>
	}
	returnCelebDates(){
		return <CelebrityPage/>
	}
	returnLangCode(){
		const language = window.navigator.userLanguage || window.navigator.language;
		console.log(language, language.substring(0,2));
		if(language.substring(0,2) == "en"){
			console.log(language.substring(0,2))
			return 1;
		}
		return 0;
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
			case "vacation-overview":
				return 6;
				break;
			default:
				return -1;
				break;
		}
			
				
	}
	
	loggingIn(){
		this.setState({
			isLoggingIn: true
		});
	}
	finishedLoggingIn(){
		this.setState({
			isLoggingIn: false
		});
	}
	tokenPlaced(){
		this.setState({
			isLoggingIn: !this.state.isLoggedIn
		});
	}
	
	updatePageNum = (ev) => {
		// console.log(ev.target);
		let pathString = ev.target.getAttribute('value');
		// console.log(ev.target.getAttribute('value'));
		let pageNum = -1;
		switch (pathString){
			case "":
				pageNum = 0;
				break;
			case "vacation":
				pageNum = 1;
				break;
			case "meal":
				pageNum = 3;
				break;
			case "calculator":
				pageNum = 5;
				break;
			case "vacation-overview":
				pageNum = 6;
				break;
			default:
				pageNum = -1;
				break;
		}
		console.log(pageNum);
		this.setState({
			pageNum:pageNum,
			isMenuBarOpen: false
			
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
						openLoginModal={this.openLoginModal}
						closeLoginModal={this.closeLoginModal}
						openSignupModal={this.openSignupModal}
						closeSignupModal={this.closeSignupModal}
						isLoggedIn={this.state.isLoggedIn}
						onClickLogout={this.logoutCurrentUser}
						userLanguage={this.state.userLanguage}
					/>
					<LoadingScreen
						isLoading={this.state.isLoading}
					/>
					<PageHeader 
						isDaysNotWolgeup={this.state.isDaysNotWolgeup}
						onCalcSwitcherClick={this.onCalcSwitcherClick}
						onClickOpenLoginModal={this.openLoginModal}
						onClickOpenSignupModal={this.openSignupModal}
						onClickLogout={this.logoutCurrentUser}
						updatePageNum={this.updatePageNum}
						toggleMenuBar={this.toggleMenuBar}
						isMenuBarOpen={this.state.isMenuBarOpen}
						pageNum={this.state.pageNum}
						isLoggedIn={this.state.isLoggedIn}
						userLanguage={this.state.userLanguage}
					/>

					<SignupModal
						signupModalIsOpen={this.state.signupModalIsOpen}
						closeSignupModal={this.closeSignupModal}
						contentLabel="Signup Modal"
						subtitle={this.subtitle}
						selectedDate={this.state.selectedDate}
						onChangeDate={this.onClickDay}
						selectedType={this.state.selectedType}
						userLanguage={this.state.userLanguage}
					/>
					<LoginModal
						loginModalIsOpen={this.state.loginModalIsOpen}
						onAfterLoginOpen={this.afterOpenLoginModal}
						closeLoginModal={this.closeLoginModal}
						loggedIn={this.loggedIn}
						loggingIn={this.loggingIn}
						finishedLoggingIn={this.finishedLoggingIn}
						tokenPlaced={this.tokenPlaced}
						contentLabel="Login Modal"
						onChangeDay={this.onClickDay}
						subtitle={this.subtitle}
						userLanguage={this.state.userLanguage}
					/>

					<Route path="/calculator/" component={this.returnCalculatorPage}/>
					<Route path="/vacation/" component={this.returnVacationPage}/>
					<Route exact path="/" component={this.returnMainPage}/>
					<Route path="/vacation-overview" component={this.returnVacationOverview}/>
					<Route path="/meal/" component={this.returnMealPlanPage}/>
				</div>
			</Router>
		);
	}
	
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);