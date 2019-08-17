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
const loginAxios = axios.create();

class LoginHeader extends React.Component{
	render() {
		return (
			<div className="login-modal-header">	
				<h2 className="login-modal-header-text">로그인!</h2>
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

	
	render() {
		console.log(this.props.isLoggingIn);
		const loginBtnClass = "login-modal-login-button " + (this.props.isLoggingIn ? "login-modal-loading" : "" );
		
		const loginErrorMessage = "modal-message modal-error-message " + (this.props.showErrorMessage ? "" : "hidden");
		
		return (
			<div className="login-modal-box">
				<div>
				</div>
				<div className={loginErrorMessage}>아이디와 비밀번호를 확인하고<br/> 다시 입력해 주십시오.</div>
				<form>
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
						<input className={loginBtnClass} type="button" name="submit" onClick={() => this.props.handleSubmit()} value="로그인" />
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
			console.log('started logging in');
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
			console.log('finished logging in');
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
		console.log(e.target.value);
		this.setState({[e.target.name]: e.target.value});
	}
	
	openSignupModal(){
		this.closeLoginModal();
		
	}
	
	closeLoginModal(){
		this.props.closeLoginModal();
		this.setState({showErrorMessage:false, email:'', password:'', isLoggingIn: false});
		console.log('closing modal');
		
	}
	async handleSubmit(){
		
		console.log('hello');
		console.log(this.state.email);
		console.log(this.state.password);
		console.log(this.state.isLoggingIn);
		try{
			let getUsers = await
			loginAxios.post('https://goondae-server.run.goorm.io/users/login', {
				email: this.state.email,
				password: this.state.password
				
			});
			console.log(getUsers);
			
			//saving in local storage vs cookie
			console.log("token ", getUsers.data.token);
			localStorage.setItem('token', getUsers.data.token);
			this.props.loggedIn();
			// document.cookie = 'token='+getUsers.data.token;
			// console.log(document.cookie);
			
			console.log(getUsers.data.user.startDate);
			var startDate = new Date(getUsers.data.user.startDate);
			
			console.log(startDate.getDate());
			this.props.onChangeDay(startDate);
			localStorage.setItem('startDate', startDate);
			// set the startDate item of local storage to the startDate of the user
			this.props.closeLoginModal();
		}catch(e){
			console.log(e);
		}
		console.log(this.state.isLoggingIn);
        

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
					<LoginHeader closeLoginModal={this.closeLoginModal}/>
					<LoginBox
						showErrorMessage={this.state.showErrorMessage}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						isLoggingIn={this.state.isLoggingIn}
						closeLoginModal={this.closeLoginModal}
					/>					
				</Modal>
			</div>
		);
	}
}
export default LoginModal;