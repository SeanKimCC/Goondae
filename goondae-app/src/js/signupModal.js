import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import '../css/modal-style.css';



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

	
	render() {
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
		console.log(startDateObj);
		
		return (
			<div className="login-modal-box">
				<div>
				</div>
				<div className={signupErrorMessage}>아이디와 비밀번호를 확인하고<br/> 다시 입력해 주십시오.</div>
				<div className={signupSuccessMessage}>가입이 완료되었습니다!</div>
				<form>
					<div className="login-field">
						<span className="fas fa-calendar-day login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="date" name="startDate" onChange={(e) => this.props.handleDateChange(e)} placeholder="입대일자" value={startDateObj}/>

					</div>
					<div className="login-field">
						<span className="fas fa-signature login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="name" onChange={(e) => this.props.handleChange(e)} placeholder="성명"/>

					</div>
					<div className="login-field">

						<span className="fas fa-envelope login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="email" onChange={(e) => this.props.handleChange(e)} placeholder="아이디"/>

					</div>
					<div className="login-field">
						<div>
							<span className="fas fa-key login-modal-field-icon"></span>
							<input className="login-modal-input-box" type="text" name="password" onChange={(e) => this.props.handleChange(e)} placeholder="비밀번호"/>
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
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
		this.closeSignupModal = this.closeSignupModal.bind(this);
		// this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			email: '',
			password: '',
			startDate: this.props.selectedDate,
			showErrorMessage: false,
			showSuccessMessage: false
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
		console.log("hello" , e.target.value);
		// const dateValue = e.target.value;
		// console.log(dateValue.substr(5,2));
		// const newDate = dateValue.substr(0,4) + "-" + dateValue.substr(5,2)  + "-" + dateValue.substr(8,2) ;
		const newDate = new Date(e.target.value);
		console.log(newDate);
		this.setState({[e.target.name]: newDate});
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
	async handleSignupSubmit(){
		
		console.log('hello');
		console.log(this.state.email);
		console.log(this.state.password);
		console.log(this.state.isSigningUp);
		try{
			console.log(this.state.startDate);
			const startDate = new Date(this.state.startDate);
			console.log(startDate);
			let getUsers = await
			signupAxios.post('https://goondae-server.run.goorm.io/users', {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				startDate: startDate,
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
						handleDateChange={this.handleDateChange}
						handleSignupSubmit={this.handleSignupSubmit}
						isSigningUp={this.state.isSigningUp}
						closeSignupModal={this.closeSignupModal}
						selectedDate={this.state.startDate}
					/>					
				</Modal>
			</div>
		);
	}
}
export default SignupModal;