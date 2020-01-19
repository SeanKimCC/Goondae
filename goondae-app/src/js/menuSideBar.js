import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as myConstClass from './utils/languageConstants.js';

class MenuBar extends React.Component{
	render(){
		const menuBarClass = "menu-side-bar " + (this.props.isMenuBarOpen ? "menu-side-bar-open" : "");
		const menuScreenClass = "menu-bar-screen " + (this.props.isMenuBarOpen ? "menu-bar-screen-open" : "");
		const menuOverlayScreenClass = "overlay-whole-screen " + (this.props.isMenuBarOpen ? "menu-overlay-screen" : "" );
		const menuBarItemClass = "menu-bar-item";
		const arrowIconClass = "menu-bar-right-arrow-icon fa fa-chevron-right";
		const topBarContent = this.props.isLoggedIn ? <div className="menu-bar-login-signup"><div className="menu-bar-logout-btn" onClick={this.props.onClickLogout} > {myConstClass.LOGOUT[this.props.userLanguage]}</div></div>
		 : <div className="menu-bar-login-signup"><div className="menu-bar-login-btn menu-bar-login-signup-btn" onClick={this.props.openLoginModal} > {myConstClass.LOGIN[this.props.userLanguage]}</div>
		 <div className="menu-bar-signup-btn menu-bar-login-signup-btn" onClick={this.props.openSignupModal} >{myConstClass.SIGNUP[this.props.userLanguage]}</div></div>  
		
		if(this.props.isLoggedIn){
			
		} else {
			
		}
		return( 
			<div className={menuScreenClass}>
				<div className={menuBarClass}>
					{topBarContent}
					<div id="menuBarTitle" className={menuBarItemClass}><Link className="menu-bar-link" to="/" onClick={this.props.updatePageNum} value="">{myConstClass.GOONDAETITLE[this.props.userLanguage]}</Link></div>
					
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/vacation/" onClick={this.props.updatePageNum} value="vacation">{myConstClass.VACATIONCHART[this.props.userLanguage]}<span className={arrowIconClass}></span></Link></div>
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/meal/" onClick={this.props.updatePageNum} value="meal">{myConstClass.MEALPLAN[this.props.userLanguage]}<span className={arrowIconClass}></span></Link></div>
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/calculator/" onClick={this.props.updatePageNum} value="calculator">{myConstClass.CALCULATOR[this.props.userLanguage]}<span className={arrowIconClass}></span></Link> </div>
				</div>
				<div className={menuOverlayScreenClass} onClick={this.props.toggleMenuBar}></div>
			</div>
			
			
		);
	}
}

export default MenuBar;