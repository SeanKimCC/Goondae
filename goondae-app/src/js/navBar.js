import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class MenuBar extends React.Component{

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
		console.log(resultString);
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
				return 0;
				break;
		}
	}
	pageTitle(){
		const pageString = window.location.pathname;
		let resultString = String(pageString.match(/^\/[a-z?-A-Z]+/g));
		resultString = resultString.substring(1,);
		console.log(resultString);
		switch (resultString){
			case "":
				return "군대닷컴";
				break;
			case "vacation":
				return "휴가 계획표";
				break;
			case "vacation-overview":
				return "휴가 수정";
				break;	
			case "futureMe":
				return "미래의 나에게";
				break;
			case "meal":
				return "식단표";
				break;
			case "openBoard":
				return "자유게시판";
				break;
			case "calculator":
				return "계산기";
				break;
			default:
				return "군대닷컴";
				break;
		}
	}
	onBackButtonEvent(event){
		console.log(event);
	}
	componentDidMount(){
		const self = this;
		window.onpopstate = function(event){ // triggers when browser back button is clicked.
			const pageString = window.location.pathname;
			let resultString = String(pageString.match(/^\/[a-z?-A-Z]+/g));
			resultString = resultString.substring(1,);
			console.log(resultString);
			switch (resultString){
				case "":
					resultString = "군대닷컴";
					break;
				case "vacation":
					resultString = "휴가 계획표";
					break;
				case "vacation-overview":
					resultString = "휴가 수정";
					break;	
				case "futureMe":
					resultString = "미래의 나에게";
					break;
				case "meal":
					resultString = "식단표";
					break;
				case "openBoard":
					resultString = "자유게시판";
					break;
				case "calculator":
					resultString = "계산기";
					break;
				default:
					resultString = "군대닷컴";
					break;
			}
			self.setState({
				pageTitle: resultString
			});
		}
		
		

		
	}
	render(){
		let pageTitleText = this.pageTitle();
		console.log(pageTitleText);
		let showSwitchBtn = false;
		let showSwitchCalcBtn = false;
		let showSwitchVacBtn = false;
		let switchBtn = <div></div>;
		var switchVacBtn, vacSwitchLink;
		const pageNum = this.pageNum()
		console.log(pageNum);
		if(pageNum == 5){
			const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
			pageTitleText = isDaysNotWolgeup ? "군복무 계산기" : "군월급 계산기";
			showSwitchCalcBtn = true;
		} else if(pageNum == 1){
			showSwitchVacBtn = true;
			switchVacBtn = "휴가 수정";
			vacSwitchLink = "/vacation-overview/";
		} else if(pageNum == 6){
			showSwitchVacBtn = true;
			switchVacBtn = "휴가 계획표";
			vacSwitchLink = "/vacation/";
		}
		showSwitchBtn = showSwitchVacBtn || showSwitchCalcBtn;
		
		console.log('page header render');
		const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
		console.log(isDaysNotWolgeup);
		const switchCalcBtn = !isDaysNotWolgeup ? "군복무 계산기" : "군월급 계산기";
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
					
					<button className={loginBtnClass} onClick={() => this.props.onClickOpenLoginModal()}>로그인</button>
					<button className={signupBtnClass} onClick={() => this.props.onClickOpenSignupModal()}>가입하기</button>
					<button className={logoutBtnClass} onClick={() => this.props.onClickLogout()}>로그아웃</button>
				</div>
				<MenuButton
					toggleMenuBar={this.props.toggleMenuBar}
					isMenuBarOpen={this.props.isMenuBarOpen}	
				/>
			</div>
			
		);
		
	}
	
}

/*<VacationSwitcher
						showVacSwitcher={showVacSwitcher}
						pageTitleText = {pageTitleText}
						btnText = {switchPageBtnText}
						btnClass = {btnClass}
						onCalcSwitcherClick={() => this.props.onCalcSwitcherClick()}
						showSwitchCalcBtn = {showSwitchCalcBtn}
					/>*/
// class GoondaeDaysLeft extends React.Component{ //state to upper level and pass it down to resultBox as well.
// 	constructor(props){
// 		super(props);
		
// 		this.state = {
// 			isDaysNotWolgeup : true,
			
// 		};
// 	}
	
// 	componentDidMount(){
		
// 		// const gtmSCript2 = document.createElement("script");
// 		// const scriptText = document.createTextNode(`window.dataLayer = window.dataLayer || [];
// 		// function gtag(){dataLayer.push(arguments);}
// 		// gtag('js', new Date());
// 		// gtag('config', 'UA-113300855-1');`);
		
// 		// gtmSCript2.appendChild(scriptText);
		
// 		// document.head.appendChild(gtmSCript2);
		
		
// 		// const gtmScript = document.createElement("script");
// 		// gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-113300855-1";
// 		// gtmScript.async = true;
		
// 		// document.head.appendChild(gtmScript);
		
		
		
		
// 	}
	
// 	switcherClicked(){
// 		const isDaysNotWolgeup = this.state.isDaysNotWolgeup;
		
// 		this.setState({
// 			isDaysNotWolgeup : !isDaysNotWolgeup
// 		});
// 	}
	
// 	render() {
// 		return (
// 			<PageHeader 
// 				isDaysNotWolgeup={this.props.isDaysNotWolgeup}
// 				onClick={() => this.switcherClicked()}
// 			/>
// 		);
// 	}
// }

export default PageHeader;