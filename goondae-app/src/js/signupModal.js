import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import '../css/modal-style.css';

const payMonths = [4,11,18];
const oneDay = 24*60*60*1000;
const serviceTypesProp = ["육군", "해군", "공군", "해병대", "의경", "해경", "소방원", "공익"];
const numMonthsProp = [21, 23, 24, 21, 21, 23, 23, 24];
const shortenedNumMonthsProp = [18, 20, 22, 18, 18, 20, 20, 21]; 
const perRankMonthlyPay2017Prop = [163000, 176400, 195000, 216000];
const perRankMonthlyPay2018Prop = [306100, 331300, 366200, 405700];
const perRankMonthlyPay2020Prop = [408100, 441700, 488200, 504900];



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
const signupAxios = axios.create();

class SignupHeader extends React.Component{
	render() {
		return (
			<div className="login-modal-header">	
				<h2 className="login-modal-header-text">가입!</h2>
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
		console.log(event);
		if(event.key == "Enter"){
			this.props.handleSignupSubmit();
		}
	}
	
	render() {
		console.log(this.props.selectedDate);
		console.log(this.props.isLoggingIn);
		const signupBtnClass = "login-modal-login-button " + (this.props.isSigningUp ? "login-modal-loading" : "" );
		
		const signupErrorMessage = "modal-message modal-error-message " + (this.props.showErrorMessage ? "" : "hidden");
		const signupSuccessMessage = "modal-message modal-success-message " + (this.props.showSuccessMessage ? "" : "hidden");
		console.log(signupSuccessMessage, this.props.showSuccessMessage);
		
		
		const startDate = this.props.selectedDate;
		console.log(startDate);
		// const selectedDate = new Date(selectedDateArr[2], selectedDateArr[1]-1, selectedDateArr[0]);
		// console.log(selectedDate);
		const startDateObj = startDate.getFullYear() + '-' + ((startDate.getMonth()+1)>9 ? '' : '0') +(startDate.getMonth()+1) + '-' + (startDate.getDate()>9 ? '' : '0') + startDate.getDate();
		
		const selectedTypeObj = this.props.selectedType;
		console.log(selectedTypeObj);
		const typeOptions = [
			{ value: 0, label: '육군' },
			{ value: 1, label: '해군' },
			{ value: 2, label: '공군' },
			{ value: 3, label: '해병대' },
			{ value: 4, label: '의경' },
			{ value: 5, label: '해경' },
			{ value: 6, label: '소방원' },
			{ value: 7, label: '공익' }];
		
		console.log("@@@@@@@@@" + startDateObj);
		
		return (
			<div className="login-modal-box">
				<div>
				</div>
				<div className={signupErrorMessage}>모든 항목을 확인하고<br/> 입력해 주십시오.</div>
				<div className={signupSuccessMessage}>가입이 완료되었습니다!</div>
				<form>
					<div className="login-field">
						<span className="fas fa-calendar-day login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="date" name="startDate"  
							onKeyPress={this.keyPressed}
							onChange={(e) => this.props.handleDateChange(e)} placeholder="입대일자" value={startDateObj}/>

					</div>
					<div className="login-field">
						<span className="fas fa-calendar-day login-modal-field-icon"></span>
						<select className="login-modal-input-box" id="mySelect" name="serviceType" onChange={(e) => this.props.handleChange(e)}>
						 	<option value="0">육군</option>
						 	<option value="1">해군</option>
						 	<option value="2">공군</option>
						 	<option value="3">해병대</option>
							<option value="4">의무경찰</option>
						 	<option value="5">해양경찰</option>
						 	<option value="6">의무소방원</option>
						 	<option value="7">사회복무요원</option>
						</select>

					</div>
					<div className="login-field">
						<span className="fas fa-signature login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="name"  
							onKeyPress={this.keyPressed}
							onChange={(e) => this.props.handleChange(e)} placeholder="성명"/>

					</div>
					<div className="login-field">

						<span className="fas fa-envelope login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="email"  
							onKeyPress={this.keyPressed}
							onChange={(e) => this.props.handleChange(e)} placeholder="아이디"/>

					</div>
					<div className="login-field">
						<div>
							<span className="fas fa-key login-modal-field-icon"></span>
							<input className="login-modal-input-box" type="text" name="password"  
							onKeyPress={this.keyPressed}
								onChange={(e) => this.props.handleChange(e)} placeholder="비밀번호"/>
						</div>
					</div>
					
					<div className="login-field">
						<input className={signupBtnClass} type="button" name="submit" onClick={() => this.props.handleSignupSubmit()} value="가입하기" />
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
		console.log("!!!!Signup" + this.props.selectedDate);
		this.state = {
			email: '',
			password: '',
			startDate: this.props.selectedDate,
			showErrorMessage: false,
			showSuccessMessage: false,
			serviceType: this.props.selectedType
		};
		
	}
	componentDidMount(){
		console.log("@@@@@Signup" + this.props.selectedDate);
		var self = this;
		signupAxios.interceptors.request.use(function (config) {

			// spinning start to show
			// UPDATE: Add this code to show global loading indicator
			// document.body.classList.add('loading-indicator');
			self.setState({
				isSigningUp: true
			});
			console.log('started signing in');
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
			console.log('finished1111');
			self.setState({
				isSigningUp: false,
				// email: '',
				// password: '',
				showSuccessMessage: true,
				showErrorMessage: false
			});

			return response;
			}, function (error) {
				console.log('error response');
				self.setState({
					isSigningUp: false,
					// email: '',
					// password: '',
					showErrorMessage:true,
					showSuccessMessage:false
				});
				return Promise.reject(error);
		});
	}
	handleDateChange(e){
		this.props.onChangeDate(new Date(e.target.value));
		this.setState({[e.target.name]: new Date(e.target.value)});
		console.log("hello" , e.target.value);
		console.log(this.state.startDate);
		// const dateValue = e.target.value;
		// console.log(dateValue.substr(5,2));
		// const newDate = dateValue.substr(0,4) + "-" + dateValue.substr(5,2)  + "-" + dateValue.substr(8,2) ;
		// const newDate = new Date(e.target.value);
		// console.log(newDate);
		// this.setState({[e.target.name]: newDate});
	}
	
	handleDropdownChange(e){
		console.log(e.label, e.value);
		this.setState({serviceType : e.value});
	}
	handleChange(e){
		console.log(e.target.value);
		this.setState({[e.target.name]: e.target.value});
	}
	
	closeSignupModal(){
		this.props.closeSignupModal();
		this.setState({showErrorMessage:false, email:'', password:'', isSigningIn: false, showSuccessMessage:false});
		console.log('closing modal');
		
	}
	
	
	calculateOriginalDaysLeft(){
		const numMonths = numMonthsProp[this.state.serviceType];
		const selectedDate = this.state.startDate;
		// const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = new Date(selectedDate.getTime());
		
		var newDate = date;
		
		newDate.setMonth(newDate.getMonth() + numMonths);
		newDate.setDate(newDate.getDate()-1);
		
		return newDate;
	}
	
	calculateEarliestDate(){
		const shortenedNumMonths = shortenedNumMonthsProp[this.state.serviceType];
		const selectedDate = this.state.startDate;
		// const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		const date = new Date(selectedDate.getTime());
		
		var newDate = date;
		
		newDate.setMonth(newDate.getMonth() + shortenedNumMonths);
		newDate.setDate(newDate.getDate()-1);

		return newDate;
	}
	
	calculateUpdatedDaysLeft(){ // numShortenedDays
		
		const selectedDate = this.state.startDate;
		// const date = new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
		console.log(selectedDate);
		const date = new Date(selectedDate.getTime());
		
		var subtractStartDay;
		switch (this.state.serviceType){
			case 0:
			case 3:
			case 4:
				subtractStartDay = new Date(2017, 0, 2);
				break;
			case 1:
			case 5:
			case 6:
				subtractStartDay = new Date(2016, 10, 2);
				break;
			case 2:
				subtractStartDay = new Date(2016, 9, 2);
				break;
			case 7:
				subtractStartDay = new Date(2016, 9, 2);
				break;
			default:
				subtractStartDay = new Date(2017, 0, 2);
				break;
		}


		var diffDays = Math.round(Math.abs((subtractStartDay.getTime() - date.getTime())/(oneDay)));

		var daysToSubtract = Math.ceil(diffDays/14);
		
		const originalDate = this.calculateOriginalDaysLeft();
		var newDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate()-daysToSubtract);
		
		var earliestDate = this.calculateEarliestDate();
		if(newDate < earliestDate){
			
			daysToSubtract = Math.round(Math.abs((earliestDate.getTime() - originalDate.getTime())/(oneDay)));
			
			return [earliestDate, daysToSubtract];
		}
		
		return [newDate, daysToSubtract];
	}
	
	async handleSignupSubmit(){
		
		console.log('hello');
		console.log(this.state.email);
		console.log(this.state.password);
		console.log(this.state.isSigningUp);
		try{
			console.log(this.state.startDate);
			const startDate = new Date(this.props.selectedDate);
			console.log(startDate);
			const endDate = this.calculateUpdatedDaysLeft()[0];
			console.log(endDate);
			let getUsers = await
			signupAxios.post('https://goondae-server.run.goorm.io/users', {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				startDate: startDate,
				serviceType: this.state.serviceType,
				endDate: endDate,
				mealUnit: 0
			});
			console.log(getUsers);
			
			// this.props.closeModal();
		}catch(e){
			console.log(e);
		}
		console.log(this.state.isSigningUp);
        

        // getUsers();
		// return false;
	}
	// handlePasswordChange(val){
	// 	this.setState({password: val});
	// }
	render() {
		console.log("####Signup" + this.props.selectedDate);
		const startDate = new Date(this.state.startDate);
		console.log(startDate);
		const endDate = this.calculateUpdatedDaysLeft()[0];
		console.log(endDate);
		return (
			<div>
				<Modal
				isOpen={this.props.signupModalIsOpen}
				onRequestClose={this.closeSignupModal}
				style={customStyles}
				contentLabel="Example Modal"
				>
					<SignupHeader closeSignupModal={this.closeSignupModal}/>
					<SignupBox
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
					/>					
				</Modal>
			</div>
		);
	}
}
export default SignupModal;