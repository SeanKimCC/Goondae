import React from 'react';


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
		
		var switcherClass = "compensation-arrow-icon fa " + this.props.btnClass + (this.props.showDaysWolgeupSwitcher ? "" : " hidden");
		
		var daysWolgeupClass = (this.props.showDaysWolgeupSwitcher ? "compensation-link compensation-link-text": " hidden");
		var vacationClass= (this.props.showVacSwitcher ? "compensation-link compensation-link-text": " hidden");
		console.log(daysWolgeupClass);
		
		var daysSwitcherClass = switcherClass + (this.props.showDaysWolgeupSwitcher ? "": " hidden");
		var vacationSwitcherClass = switcherClass + (!this.props.showDaysWolgeupSwitcher ? "": " hidden");
		
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
				
				<a className={vacationClass} onClick={this.props.onCalcSwitcherClick}>
					<span> {this.props.btnText}	</span>
					<span className="compensation-arrow-icon fa fa-arrow-right"></span>
				</a>
				<a className="compensation-link compensation-link-icon" onClick={this.props.onCalcSwitcherClick}>
					<span className={vacationSwitcherClass}></span>
				</a>
				
				
			</div>
			
		);
	}	
}

class VacationSwitcher extends React.Component {
	render() {
		var switcherClass = "compensation-arrow-icon fa " + this.props.btnClass + (this.props.showSwitchCalcBtn ? "" : " hidden");
		return(
			<div>
				<span className="goonbokmu-title-text">
					{this.props.pageTitleText}
				</span>
				<a className="compensation-link compensation-link-text" onClick={this.props.onCalcSwitcherClick}>
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

class DNSChanger extends React.Component{
	
}

class PageHeader extends React.Component{
	
	pageTitle(){
		switch (this.props.pageNum){
			case 0:
				return "군대닷컴";
			case 1:
				return "휴가 달력";
			case 2:
				return "미래의 나에게";
			case 3:
				return "식단표";
			case 4:
				return "자유게시판";
			case 5:
				return "계산기";
			case -1:
				return "wrong";
			default:
				return "wrong";
		}
	}
	
	render(){
		let pageTitleText = this.pageTitle();
		let showSwitchCalcBtn = false;
		if(this.props.pageNum == 5){
			const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
			pageTitleText = isDaysNotWolgeup ? "군복무 계산기" : "군월급 계산기";
			showSwitchCalcBtn = true;
		}
		console.log('page header render');
		const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
		console.log(isDaysNotWolgeup);
		const switchPageBtnText = !isDaysNotWolgeup ? "군복무 계산기" : "군월급 계산기";
		const headerId = (isDaysNotWolgeup || this.props.pageNum == 3) ? "pageHeader" : "wolgeupPageHeader";
		const btnClass = !isDaysNotWolgeup ? "fa-hourglass-half" : "fa-won-sign";
		const token = localStorage.getItem('token');
		let isLoggedIn = false;
		if(token){
			isLoggedIn = true;
			//TODO: When I deleted the account in the database after login, the token was saved in the local storage, but there wasn't an actual user to be logged into in the database. This resulted in the user not being able to logout of an unexisting user. This might be a case that can be ignored.
		}
		const loginBtnClass = "login-modal-open-btn modal-open-btn btn btn-default " + (isLoggedIn ? "hidden" : "");
		const signupBtnClass = "signup-modal-open-btn modal-open-btn btn btn-default " + (isLoggedIn ? "hidden" : "");
		const logoutBtnClass = "logout-modal-open-btn modal-open-btn btn btn-default " + (isLoggedIn ? "" : "hidden");
		
		let showDaysWolgeupSwitcher = false;
		let showVacSwitcher = false;
		if(this.props.pageNum == 5) {
			showDaysWolgeupSwitcher = true;
		} else if (this.props.pageNum == 0){
			showVacSwitcher = false;
		} 
		
		console.log(this.props.pageNum, showDaysWolgeupSwitcher);
		
		return(
			<div id={headerId}>
				
				
				<div id="goonbokmuTitle">
					<DaysWolgeupSwitcher
						showDaysWolgeupSwitcher = {showDaysWolgeupSwitcher}
						showVacSwitcher={showVacSwitcher}
						pageTitleText = {pageTitleText}
						btnText = {switchPageBtnText}
						btnClass = {btnClass}
						onCalcSwitcherClick={() => this.props.onCalcSwitcherClick()}
						onClickOpenLoginModal = {() => this.props.onClickOpenLoginModal}
						showSwitchCalcBtn = {showSwitchCalcBtn}
						displaySwitcher = {this.props.pageNum === 5}
					/>
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