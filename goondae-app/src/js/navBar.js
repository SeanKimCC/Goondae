import React from 'react';

class MenuButton extends React.Component{
	
}


class DaysWolgeupSwitcher extends React.Component{
	
	render(){
		var classNames = "compensation-arrow-icon fa " + this.props.btnClass;
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
	
	render(){
		const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
		console.log(isDaysNotWolgeup);
		const pageTitleText = isDaysNotWolgeup ? "군복무 계산기" : "군월급 계산기";
		const switchPageBtnText = !isDaysNotWolgeup ? "군복무 계산기" : "군월급 계산기";
		const btnClass = !isDaysNotWolgeup ? "fa-hourglass-half" : "fa-won-sign";
		
		
		return(
			<div id="pageHeader">
				<div id="goonbokmuTitle">
					<DaysWolgeupSwitcher
						pageTitleText = {pageTitleText}
						btnText = {switchPageBtnText}
						btnClass = {btnClass}
						onClick={() => this.props.onClick()}
						onClickOpenLoginModal = {() => this.props.onClickOpenLoginModal}
					/>
					<button className="login-modal-open-btn modal-open-btn btn btn-default" onClick={() => this.props.onClickOpenLoginModal()}>로그인</button>
					<button className="signup-modal-open-btn modal-open-btn btn btn-default" onClick={() => this.props.onClickOpenSignupModal()}>가입하기</button>
				</div>
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