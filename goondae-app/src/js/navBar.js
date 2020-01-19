import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/menu-side-bar.css';
import * as myConstClass from './utils/languageConstants.js';

class MenuButton extends React.Component{
	
	render(){
		const openOrNot = this.props.isMenuBarOpen ? "open" : "";
		 return(
			<div id="nav-icon2" className={openOrNot} onClick={this.props.toggleMenuBar}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		 );
	}
	
}


class DaysWolgeupSwitcher extends React.Component{
	
	render(){
		
		var switcherClass = "compensation-arrow-icon fa " + this.props.btnClass + (this.props.showSwitchCalcBtn ? "" : " hidden");
		
		var daysWolgeupClass = (this.props.showSwitchCalcBtn ? "compensation-link compensation-link-text": " hidden");
		
		var daysSwitcherClass = switcherClass + (this.props.showSwitchCalcBtn ? "": " hidden");
		
		return(
			<div>
				<span className="goonbokmu-title-text">
					{this.props.pageTitleText}
				</span>
				<a className={daysWolgeupClass} onClick={this.props.onCalcSwitcherClick}>
					<span> {this.props.btnText}	</span>
					<span className="compensation-arrow-icon fa fa-arrow-right"></span>
				</a>
				<a className="compensation-link compensation-link-icon" onClick={this.props.onCalcSwitcherClick}>
					<span className={switcherClass}></span>
				</a>
				
				
			</div>
			
		);
	}	
}

class VacationSwitcher extends React.Component {
	render() {
		var switcherClass = "compensation-arrow-icon fa " + this.props.btnClass + (this.props.showSwitchVacBtn ? "" : " hidden");
		return(
			<div>
				<span className="goonbokmu-title-text">
					{this.props.pageTitleText}
				</span>
				<Link className="compensation-link compensation-link-text" to={this.props.vacSwitchLink} onClick={this.props.updatePageNum} value="vacation-overview">
					<span> {this.props.btnText} </span>
					<span className="compensation-arrow-icon fa fa-arrow-right"></span>
				</Link>
				<a className="compensation-link compensation-link-icon" onClick={this.props.onCalcSwitcherClick}>
					<span className={switcherClass}></span>
				</a>
			</div>
			
		);
	}
}

class DNSChanger extends React.Component{
	
}

class PageHeader extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageTitle : this.pageTitle()
		};
	}
	
	pageNum(){
		const pageString = window.location.pathname;
		let resultString = String(pageString.match(/^\/[a-z?-A-Z]+/g));
		resultString = resultString.substring(1,);
		switch (resultString){
			case "":
				return 0;
				break;
			case "vacation":
				return 1;
				break;
			case "vacation-overview":
				return 6;
				break;
			case "meal":
				return 3;
				break;
			case "calculator":
				return 5;
				break;
			default:
				return 0;
				break;
		}
	}
	pageTitle(){
		const pageString = window.location.pathname;
		let resultString = String(pageString.match(/^\/[a-z?-A-Z]+/g));
		resultString = resultString.substring(1,);
		switch (resultString){
			case "":
				return myConstClass.GOONDAETITLE[this.props.userLanguage];
				break;
			case "vacation":
				return myConstClass.VACATIONCHART[this.props.userLanguage];
				break;
			case "vacation-overview":
				return myConstClass.VACATIONEDIT[this.props.userLanguage];
				break;
			case "meal":
				return myConstClass.MEALPLAN[this.props.userLanguage];
				break;
			case "calculator":
				return myConstClass.CALCULATOR[this.props.userLanguage];
				break;
			default:
				return myConstClass.GOONDAETITLE[this.props.userLanguage];
				break;
		}
	}
	onBackButtonEvent(event){
		// console.log(event);
	}
	componentDidMount(){
		const self = this;
		window.onpopstate = function(event){ // triggers when browser back button is clicked.
			const pageString = window.location.pathname;
			let resultString = String(pageString.match(/^\/[a-z?-A-Z]+/g));
			resultString = resultString.substring(1,);
			switch (resultString){
				case "":
					return myConstClass.GOONDAETITLE[this.props.userLanguage];
					break;
				case "vacation":
					return myConstClass.VACATIONCHART[this.props.userLanguage];
					break;
				case "vacation-overview":
					return myConstClass.VACATIONEDIT[this.props.userLanguage];
					break;
				case "meal":
					return myConstClass.MEALPLAN[this.props.userLanguage];
					break;
				case "calculator":
					return myConstClass.CALCULATOR[this.props.userLanguage];
					break;
				default:
					return myConstClass.GOONDAETITLE[this.props.userLanguage];
					break;
			}
			self.setState({
				pageTitle: resultString
			});
		}
		
		

		
	}
	render(){
		let pageTitleText = this.pageTitle();
		let showSwitchBtn = false;
		let showSwitchCalcBtn = false;
		let showSwitchVacBtn = false;
		let switchBtn = <div></div>;
		var switchVacBtn, vacSwitchLink;
		const pageNum = this.pageNum()
		if(pageNum == 5){
			const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
			pageTitleText = isDaysNotWolgeup ? myConstClass.DATECALCULATOR[this.props.userLanguage] : myConstClass.SALARYCALCULATOR[this.props.userLanguage];
			showSwitchCalcBtn = true;
		} else if(pageNum == 1){
			showSwitchVacBtn = true;
			switchVacBtn = myConstClass.VACATIONEDIT[this.props.userLanguage];
			vacSwitchLink = "/vacation-overview/";
		} else if(pageNum == 6){
			showSwitchVacBtn = true;
			switchVacBtn = myConstClass.VACATIONCHART[this.props.userLanguage];
			vacSwitchLink = "/vacation/";
		}
		showSwitchBtn = showSwitchVacBtn || showSwitchCalcBtn;
		

		const isDaysNotWolgeup = this.props.isDaysNotWolgeup;

		const switchCalcBtn = !isDaysNotWolgeup ? myConstClass.DATECALCULATOR[this.props.userLanguage] : myConstClass.SALARYCALCULATOR[this.props.userLanguage];
		const headerId = isDaysNotWolgeup ? "pageHeader" : "wolgeupPageHeader";
		const btnClass = !isDaysNotWolgeup ? "fa-hourglass-half" : "fa-won-sign";
		
		
		// const token = localStorage.getItem('token');
		// let isLoggedIn = false;
		// if(token){
		// 	isLoggedIn = true;
		// 	//TODO: When I deleted the account in the database after login, the token was saved in the local storage, but there wasn't an actual user to be logged into in the database. This resulted in the user not being able to logout of an unexisting user. This might be a case that can be ignored.
		// }
		
		const loginBtnClass = "login-modal-open-btn modal-open-btn btn btn-default " + (this.props.isLoggedIn ? "hidden" : "") + (showSwitchBtn ? "" : " login-btn-without-switcher");
		const signupBtnClass = "signup-modal-open-btn modal-open-btn btn btn-default " + (this.props.isLoggedIn ? "hidden" : "") + (showSwitchBtn ? "" : " signup-btn-without-switcher");
		const logoutBtnClass = "logout-modal-open-btn modal-open-btn btn btn-default " + (this.props.isLoggedIn ? "" : "hidden") + (showSwitchBtn ? "" : " logout-btn-without-switcher");
		
		
		if(pageNum != 1 && pageNum != 6){
			switchBtn = (<DaysWolgeupSwitcher
						pageTitleText = {pageTitleText}
						btnText = {switchCalcBtn}
						btnClass = {btnClass}
						onCalcSwitcherClick={() => this.props.onCalcSwitcherClick()}
						showSwitchCalcBtn = {showSwitchCalcBtn}
					/>);
		}else{
			switchBtn = (<VacationSwitcher
						pageTitleText = {pageTitleText}
						btnText = {switchVacBtn}
						updatePageNum = {this.props.updatePageNum}
						btnClass = {btnClass}
						onCalcSwitcherClick={() => this.props.onCalcSwitcherClick()}
						showSwitchVacBtn = {showSwitchVacBtn}
						vacSwitchLink = {vacSwitchLink}
					/>);
		}
		
		return(
			<div id={headerId}>
				
				
				<div id="goonbokmuTitle">
					{switchBtn}
					
					<button className={loginBtnClass} onClick={() => this.props.onClickOpenLoginModal()}>{myConstClass.LOGIN[this.props.userLanguage]}</button>
					<button className={signupBtnClass} onClick={() => this.props.onClickOpenSignupModal()}>{myConstClass.SIGNUP[this.props.userLanguage]}</button>
					<button className={logoutBtnClass} onClick={() => this.props.onClickLogout()}>{myConstClass.LOGOUT[this.props.userLanguage]}</button>
				</div>
				<MenuButton
					toggleMenuBar={this.props.toggleMenuBar}
					isMenuBarOpen={this.props.isMenuBarOpen}	
				/>
			</div>
			
		);
		
	}
	
}

export default PageHeader;