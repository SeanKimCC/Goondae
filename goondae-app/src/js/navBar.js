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
		var classNames = "compensation-arrow-icon fa " + this.props.btnClass + (this.props.showSwitchCalcBtn ? "" : " hidden");
		return(
			<div>
				<span className="goonbokmu-title-text">
					{this.props.pageTitleText}
				</span>
				<a className="compensation-link compensation-link-text" onClick={this.props.onClick}>
					<span> {this.props.btnText}	</span>
					<span className="compensation-arrow-icon fa fa-arrow-right"></span>
				</a>
				<a className="compensation-link compensation-link-icon" onClick={this.props.onClick}>
					<span className={classNames}></span>
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
		const btnClass = !isDaysNotWolgeup ? "fa-hourglass-half" : "fa-won-sign";
		const token = localStorage.getItem('token');
		let isLoggedIn = false;
		if(token){
			isLoggedIn = true;
		}
		const loginBtnClass = "login-modal-open-btn modal-open-btn btn btn-default " + (isLoggedIn ? "hidden" : "");
		const signupBtnClass = "signup-modal-open-btn modal-open-btn btn btn-default " + (isLoggedIn ? "hidden" : "");
		const logoutBtnClass = "logout-modal-open-btn modal-open-btn btn btn-default " + (isLoggedIn ? "" : "hidden");
		
		
		return(
			<div id="pageHeader">
				
				
				<div id="goonbokmuTitle">
					<DaysWolgeupSwitcher
						pageTitleText = {pageTitleText}
						btnText = {switchPageBtnText}
						btnClass = {btnClass}
						onClick={() => this.props.onSwitcherClick()}
						onClickOpenLoginModal = {() => this.props.onClickOpenLoginModal}
						showSwitchCalcBtn = {showSwitchCalcBtn}
					/>
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