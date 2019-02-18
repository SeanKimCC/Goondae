import React from 'react';

class DaysWolgeupSwitcher extends React.Component{
	
	render(){
		return(
			<a className="compensation-title-text" onClick={this.props.onClick}>
				{this.props.value}	
			</a>
		);
	}
	
	
}

class PageHeader extends React.Component{
	
	render(){
		const isDaysNotWolgeup = this.props.isDaysNotWolgeup;
		console.log(isDaysNotWolgeup);
		const pageTitleText = isDaysNotWolgeup ? "군복무 계산기" : "군인 월급 계산기";
		const switchPageBtnText = !isDaysNotWolgeup ? "군복무 계산기" : "군인 월급 계산기";
		
		
		
		return(
			<div id="pageHeader">
				<div id="goonbokmuTitle">
					<span className="goonbokmu-title-text">
						{pageTitleText}
					</span>
					<DaysWolgeupSwitcher
						value = {switchPageBtnText}
						onClick={() => this.props.onClick()}
					/>
					<span className="compensation-arrow-icon fa fa-arrow-right"></span>
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