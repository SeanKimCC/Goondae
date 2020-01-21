import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../css/modal-style.css';
import * as myConstClass from './utils/languageConstants.js';



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
const loginAxios = axios.create();

class LoginHeader extends React.Component{
	render() {
		console.log(this.props.userLanguage);
		return (
			<div className="login-modal-header">	
				<h2 className="login-modal-header-text">{myConstClass.LOGIN[this.props.userLanguage]}!</h2>
				<button
					className="login-modal-close-btn btn btn-default"
					dataPurpose="close-popup"
					ariaLabel="Close"
					onClick={this.props.closeLoginModal}>
					<span ariaHidden="true">×</span>
				</button>
			</div>
		);
		
	}
}

class LoginBox extends React.Component{

	keyPressed = (event) => {
		if(event.key === "Enter"){
			this.props.handleSubmit();
		}
	}
	render() {
		const loginBtnClass = "login-modal-login-button " + (this.props.isLoggingIn ? "login-modal-loading" : "" );
		
		const loginErrorMessage = "modal-message modal-error-message " + (this.props.showErrorMessage ? "" : "hidden");
		
		return (
			<div className="login-modal-box">
				<div>
				</div>
				<div className={loginErrorMessage}>{myConstClass.CHECKYOURINPUT1[this.props.userLanguage]}<br/> {myConstClass.CHECKYOURINPUT2[this.props.userLanguage]}</div>
				<form>
					<div className="login-field">

						<span className="fas fa-envelope login-modal-field-icon"></span>
						<input className="login-modal-input-box" type="text" name="email" 
							onChange={(e) => this.props.handleChange(e)} 
							onKeyPress={this.keyPressed}
							placeholder={myConstClass.USERNAME[this.props.userLanguage]}/>

					</div>
					<div className="login-field">
						<div>
							<span className="fas fa-key login-modal-field-icon"></span>
							<input className="login-modal-input-box" type="password" name="password" 
								onChange={(e) => this.props.handleChange(e)} 
								onKeyPress={this.keyPressed}
								placeholder={myConstClass.PASSWORD[this.props.userLanguage]}/>
						</div>
						
					</div>
					
					<div className="login-field">
						<input className={loginBtnClass} type="button" name="submit" onClick={() => this.props.handleSubmit()} value={myConstClass.LOGIN[this.props.userLanguage]} />
					</div>
					<div className="login-field">
						<a link="" onClick={() => this.props.openSignupModal()}></a>
					</div>
					
				</form>
				
			</div>
		);
	}
}

class LoginFooter extends React.Component{
	render() {
		return (
			<div className="login-modal-footer">
				
			</div>
		);
	}
}

class LoginModal extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);
		this.openSignupModal = this.openSignupModal.bind(this);
		// this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			email: '',
			password: '',
			isLoggingIn: false,
			showErrorMessage: false
		}
		
	}
	componentDidMount(){
		var self = this;
		loginAxios.interceptors.request.use(function (config) {

			// spinning start to show
			// UPDATE: Add this code to show global loading indicator
			// document.body.classList.add('loading-indicator');
			self.setState({
				isLoggingIn: true
			});
			self.props.loggingIn();

			return config

			}, function (error) {
				console.log('error request');
				self.setState({
					isLoggingIn: false,
					// email: '',
					// password: '',
					showErrorMessage:true
				});
				self.props.finishedLoggingIn();
				return Promise.reject(error);
		});
		loginAxios.interceptors.response.use(function (response) {

			// spinning hide
			// UPDATE: Add this code to hide global loading indicator
			// document.body.classList.remove('loading-indicator');
			self.setState({
				isLoggingIn: false,
				email: '',
				password: '',
				showErrorMessage:false
			});
			self.props.finishedLoggingIn();

			return response;
			}, function (error) {
				console.log('error response');
				self.setState({
					isLoggingIn: false,
					// email: '',
					// password: '',
					showErrorMessage:true
				});
				self.props.finishedLoggingIn();
				return Promise.reject(error);
		});
	}
	
	

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}
	
	openSignupModal(){
		this.closeLoginModal();
		
	}
	
	closeLoginModal(){
		this.props.closeLoginModal();
		this.setState({showErrorMessage:false, email:'', password:'', isLoggingIn: false});
		
	}
	async handleSubmit(){
		try{
			let getUsers = await
			loginAxios.post('/users/login', {
				email: this.state.email,
				password: this.state.password
			});
			
			//saving in local storage vs cookie
			localStorage.setItem('token', getUsers.data.token);
			this.props.tokenPlaced();
			this.props.loggedIn();
			this.props.finishedLoggingIn();
			// document.cookie = 'token='+getUsers.data.token;
			// console.log(document.cookie);
			
			var startDate = new Date(getUsers.data.user.startDate);
			
			this.props.onChangeDay(startDate);
			localStorage.setItem('startDate', startDate);
			// set the startDate item of local storage to the startDate of the user
			this.props.closeLoginModal();
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
		return (
			<div>
				<Modal
				isOpen={this.props.loginModalIsOpen}
				onRequestClose={this.closeLoginModal}
				style={customStyles}
				contentLabel="Example Modal"
				>
					<LoginHeader 
						userLanguage={this.props.userLanguage}
						closeLoginModal={this.closeLoginModal}/>
					<LoginBox
						showErrorMessage={this.state.showErrorMessage}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						isLoggingIn={this.state.isLoggingIn}
						closeLoginModal={this.closeLoginModal}
						userLanguage={this.props.userLanguage}
					/>					
				</Modal>
			</div>
		);
	}
}
export default LoginModal;