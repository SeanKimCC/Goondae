import React from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import moment from 'moment';
import * as myConstClass from './utils/languageConstants.js';
import '../css/modal-style.css';

const oneDay = 24*60*60*1000;
const numMonthsProp = [21, 23, 24, 21, 21, 23, 23, 24];
const shortenedNumMonthsProp = [18, 20, 22, 18, 18, 20, 20, 21]; 

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
	padding				  : '0 !important',
	borderTopLeftRadius   : '6px',
	borderTopRightRadius  : '6px'
  }
};
Modal.setAppElement('#root');
axios.defaults.baseURL = myConstClass.SERVERADDRESS;
const signupAxios = axios.create();

class SignupHeader extends React.Component{
	render() {
		return (
			<div className="login-modal-header">	
				<h2 className="login-modal-header-text">{myConstClass.SIGNUPSENTENCE[this.props.userLanguage]}</h2>
				<button
					className="login-modal-close-btn btn btn-default"
					dataPurpose="close-popup"
					ariaLabel="Close"
					onClick={this.props.closeSignupModal}>
					<span ariaHidden="true">×</span>
				</button>
			</div>
		);
		
	}
}

class SignupBox extends React.Component{

	keyPressed = (event) => {
		if(event.key === "Enter"){
			this.props.handleSignupSubmit();
		}
	}
	
	render() {
		const signupBtnClass = "login-modal-login-button " + (this.props.isSigningUp ? "login-modal-loading" : "" );
		
		const signupErrorMessage = "modal-message modal-error-message " + (this.props.showErrorMessage ? "" : "hidden");
		const signupSuccessMessage = "modal-message modal-success-message " + (this.props.showSuccessMessage ? "" : "hidden");
		
		
		const startDate = moment.utc(this.props.selectedDate);
		// console.log(startDate);
		// if(startDate.hour() != 0){
		// 	startDate.hour(24,0,0,0);
		// }

		// const selectedDate = moment.utc(new Date(selectedDateArr[2], selectedDateArr[1]-1, selectedDateArr[0]);
		// console.log(selectedDate);
		const startDateObj = startDate.year() + '-' + ((startDate.month()+1)>9 ? '' : '0') +(startDate.month()+1) + '-' + (startDate.date()>9 ? '' : '0') + startDate.date();
		
		const selectedTypeObj = this.props.selectedType;

		var errorMessage1 = myConstClass.SIGNUPERROR1[this.userLanguage];
		var errorMessage2 = myConstClass.SIGNUPERROR2[this.userLanguage];
		switch (this.props.errorStatusCode){
			case 406:
				errorMessage1 = myConstClass.SIGNUPEXISTINGEMAIL1[this.userLanguage];
				errorMessage2 = myConstClass.SIGNUPEXISTINGEMAIL2[this.userLanguage];

		}
		
		return (
			<div className="login-modal-box">
				<div>
				</div>
				<div className={signupErrorMessage}>{errorMessage1}<br/> {errorMessage2}</div>
				<div className={signupSuccessMessage}>{myConstClass.SIGNUPCOMPLETE[this.props.userLanguage]}</div>
				<form>
					
					<div className="login-field">
						<div className="enlistment-helper-div">{myConstClass.ENLISTMENTDATEHELP[this.props.userLanguage]}</div>
						<span className="fas fa-calendar-day login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="date" name="startDate" 
							min="2010-01-01"
							max="2030-01-01" 
							onKeyPress={this.keyPressed}
							onChange={(e) => this.props.handleDateChange(e)} placeholder={myConstClass.ENLISTMENTDATE[this.props.userLanguage]} value={startDateObj}/>

					</div>
					<div className="login-field">
						<span className="fas fa-chevron-circle-down login-modal-field-icon"></span>
						<select className="login-modal-input-box" id="mySelect" name="serviceType" onChange={(e) => this.props.handleChange(e)}>
							<option disabled>{myConstClass.PLEASESELECT[this.props.userLanguage]}</option>
						 	<option value="0">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][0]}</option>
						 	<option value="1">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][1]}</option>
						 	<option value="2">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][2]}</option>
						 	<option value="3">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][3]}</option>
							<option value="4">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][4]}</option>
						 	<option value="5">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][5]}</option>
						 	<option value="6">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][6]}</option>
						 	<option value="7">{myConstClass.LONGSERVICETYPES[this.props.userLanguage][7]}</option>
						</select>

					</div>
					<div className="login-field">
						<span className="fas fa-signature login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="name"  
							onKeyPress={this.keyPressed}
							onChange={(e) => this.props.handleChange(e)} placeholder={myConstClass.FULLNAME[this.props.userLanguage]}/>

					</div>
					<div className="login-field">

						<span className="fas fa-envelope login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="email"  
							onKeyPress={this.keyPressed}
							onChange={(e) => this.props.handleChange(e)} placeholder={myConstClass.USERNAME[this.props.userLanguage]}/>

					</div>
					<div className="login-field">
						<div>
							<span className="fas fa-key login-modal-field-icon"></span>
							<input className="login-modal-input-box" type="password" name="password"  
							onKeyPress={this.keyPressed}
								onChange={(e) => this.props.handleChange(e)} placeholder={myConstClass.PASSWORD[this.props.userLanguage]}/>
						</div>
					</div>
					
					<div className="login-field">
						<input className={signupBtnClass} type="button" name="submit" onClick={() => this.props.handleSignupSubmit()} value={myConstClass.SIGNUP[this.props.userLanguage]} />
					</div>
					<div className="login-field">
						<a link="" onClick={() => this.props.openSignupModal()}></a>
					</div>
					
				</form>
				
			</div>
		);
	}
}

class SignupModal extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
		this.closeSignupModal = this.closeSignupModal.bind(this);
		// this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			email: '',
			password: '',
			startDate: this.props.selectedDate,
			showErrorMessage: false,
			showSuccessMessage: false,
			serviceType: this.props.selectedType,
			errorStatusCode: null
		};
		
	}
	componentDidMount(){
		var self = this;
		signupAxios.interceptors.request.use(function (config) {

			// spinning start to show
			// UPDATE: Add this code to show global loading indicator
			// document.body.classList.add('loading-indicator');
			self.setState({
				isSigningUp: true
			});
			return config;

			}, function (error) {
				console.log('error request');
				self.setState({
					isSigningUp: false,
					// email: '',
					// password: '',
					showErrorMessage:true,
					showSuccessMessage: false
				});
				return Promise.reject(error);
		});
		signupAxios.interceptors.response.use(function (response) {

			// spinning hide
			// UPDATE: Add this code to hide global loading indicator
			// document.body.classList.remove('loading-indicator');
			self.setState({
				isSigningUp: false,
				// email: '',
				// password: '',
				showSuccessMessage: true,
				showErrorMessage: false,

			});
			self.closeSignupModal();
			self.openLoginModal();

			return response;
			}, function (error) {
				console.log(error.response.status);
				console.log('error response');
				self.setState({
					isSigningUp: false,
					// email: '',
					// password: '',
					errorStatusCode:error.response.status,
					showErrorMessage:true,
					showSuccessMessage:false
				});
				return Promise.reject(error);
		});
	}
	handleDateChange(e){
		this.props.onChangeDate(moment.utc(new Date(e.target.value)));
		this.setState({[e.target.name]: moment.utc(new Date(e.target.value))});
		// const dateValue = e.target.value;
		// console.log(dateValue.substr(5,2));
		// const newDate = dateValue.substr(0,4) + "-" + dateValue.substr(5,2)  + "-" + dateValue.substr(8,2) ;
		// const newDate = moment.utc(new Date(e.target.value);
		// console.log(newDate);
		// this.setState({[e.target.name]: newDate});
	}
	
	handleDropdownChange(e){
		this.setState({serviceType : e.value});
	}
	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	openLoginModal(){
		this.props.openLoginModal();
	}
	closeSignupModal(){
		this.props.closeSignupModal();
		this.setState({showErrorMessage:false, email:'', password:'', isSigningIn: false, showSuccessMessage:false});
	}
	
	
	calculateOriginalDaysLeft(){
		const numMonths = numMonthsProp[this.state.serviceType];
		const selectedDate = this.state.startDate;
		// const date = moment.utc(new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = moment.utc(new Date(selectedDate.valueOf()));
		
		var newDate = date;
		
		newDate.month(newDate.month() + numMonths);
		newDate.date(newDate.date()-1);
		
		return newDate;
	}
	
	calculateEarliestDate(){
		const shortenedNumMonths = shortenedNumMonthsProp[this.state.serviceType];
		const selectedDate = this.state.startDate;
		// const date = moment.utc(new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = moment.utc(new Date(selectedDate.valueOf()));
		
		var newDate = date;
		
		newDate.month(newDate.month() + shortenedNumMonths);
		newDate.date(newDate.date()-1);

		return newDate;
	}
	
	calculateUpdatedDaysLeft(){ // numShortenedDays
		
		const selectedDate = this.state.startDate;
		// const date = moment.utc(new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = moment.utc(new Date(selectedDate.valueOf()));
		
		var subtractStartDay;
		switch (this.state.serviceType){
			case 0:
			case 3:
			case 4:
				subtractStartDay = moment.utc(new Date(2017, 0, 2));
				break;
			case 1:
			case 5:
			case 6:
				subtractStartDay = moment.utc(new Date(2016, 10, 2));
				break;
			case 2:
				subtractStartDay = moment.utc(new Date(2016, 9, 2));
				break;
			case 7:
				subtractStartDay = moment.utc(new Date(2016, 9, 2));
				break;
			default:
				subtractStartDay = moment.utc(new Date(2017, 0, 2));
				break;
		}


		var diffDays = Math.round(Math.abs((subtractStartDay.valueOf() - date.valueOf())/(oneDay)));

		var daysToSubtract = Math.ceil(diffDays/14);
		
		const originalDate = this.calculateOriginalDaysLeft();
		var newDate = moment.utc(new Date(originalDate.year(), originalDate.month(), originalDate.date()-daysToSubtract));
		
		var earliestDate = this.calculateEarliestDate();
		// if(earliestDate.hour() != 0){
		// 	earliestDate.hour(24,0,0,0);
		// }
		if(newDate < earliestDate){
			
			daysToSubtract = Math.round(Math.abs((earliestDate.valueOf() - originalDate.valueOf())/(oneDay)));
			
			return [earliestDate, daysToSubtract];
		}
		// if(newDate.hour() != 0){
		// 	newDate.hour(24,0,0,0);
		// }
		
		return [newDate, daysToSubtract];
	}
	
	async handleSignupSubmit(){
		try{
			const startDate = moment.utc(new Date(this.props.selectedDate));
			const endDate = this.calculateUpdatedDaysLeft()[0];
			let getUsers = await
			// signupAxios.post('http://localhost:5000/users', {
			signupAxios.post('/users', {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				startDate: startDate,
				serviceType: this.state.serviceType,
				endDate: endDate,
				mealUnit: 0
			});
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
        

        // getUsers();
		// return false;
	}
	// handlePasswordChange(val){
	// 	this.setState({password: val});
	// }
	render() {
		const startDate = moment.utc(new Date(this.state.startDate));
		const endDate = this.calculateUpdatedDaysLeft()[0];
		return (
			<div>
				<Modal
				isOpen={this.props.signupModalIsOpen}
				onRequestClose={this.closeSignupModal}
				style={customStyles}
				contentLabel="Example Modal"
				>
					<SignupHeader 
						userLanguage={this.props.userLanguage}
						closeSignupModal={this.closeSignupModal}/>
					<SignupBox
						userLanguage={this.props.userLanguage}
						showErrorMessage={this.state.showErrorMessage}
						showSuccessMessage={this.state.showSuccessMessage}
						handleChange={this.handleChange}
						handleDropdownChange={this.handleDropdownChange}
						handleDateChange={this.handleDateChange}
						handleSignupSubmit={this.handleSignupSubmit}
						isSigningUp={this.state.isSigningUp}
						closeSignupModal={this.closeSignupModal}
						selectedDate={this.props.selectedDate}
						selectedType={this.state.serviceType}
						errorStatusCode = {this.state.errorStatusCode}
					/>					
				</Modal>
			</div>
		);
	}
}
export default SignupModal;