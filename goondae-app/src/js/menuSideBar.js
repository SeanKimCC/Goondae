import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MenuBar extends React.Component{
	render(){
		const menuBarClass = "menu-side-bar " + (this.props.isMenuBarOpen ? "menu-side-bar-open" : "");
		const menuScreenClass = "menu-bar-screen " + (this.props.isMenuBarOpen ? "menu-bar-screen-open" : "");
		const menuOverlayScreenClass = "overlay-whole-screen " + (this.props.isMenuBarOpen ? "menu-overlay-screen" : "" );
		const menuBarItemClass = "menu-bar-item";
		const arrowIconClass = "menu-bar-right-arrow-icon fa fa-chevron-right";
		const topBarContent = this.props.isLoggedIn ? <div className="menu-bar-login-signup"><div className="menu-bar-logout-btn" onClick={this.props.onClickLogout} > 로그아웃</div></div> : <div className="menu-bar-login-signup"><div className="menu-bar-login-btn menu-bar-login-signup-btn" onClick={this.props.openLoginModal} > 로그인</div><div className="menu-bar-signup-btn menu-bar-login-signup-btn" onClick={this.props.openSignupModal} >회원가입</div></div>  
		
		
		return( 
			<div className={menuScreenClass}>
				<div className={menuBarClass}>
					{topBarContent}
					<div id="menuBarTitle" className={menuBarItemClass}><Link className="menu-bar-link" to="/" onClick={this.props.updatePageNum} value="">타이틀 모집병과</Link></div>
					
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/vacation/" onClick={this.props.updatePageNum} value="vacation">휴가표<span className={arrowIconClass}></span></Link></div>
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/meal/" onClick={this.props.updatePageNum} value="meal">식단표<span className={arrowIconClass}></span></Link></div>
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/futureMe/" onClick={this.props.updatePageNum} value="futureMe">미래의 나에게<span className={arrowIconClass}></span></Link></div>					
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/calculator/" onClick={this.props.updatePageNum} value="calculator">복무/월급 계산기<span className={arrowIconClass}></span></Link> </div>
					<div className={menuBarItemClass}><Link className="menu-bar-link" to="/openBoard/" onClick={this.props.updatePageNum} value="openBoard">자유게시판 <span className={arrowIconClass}></span></Link> </div>
				</div>
				<div className={menuOverlayScreenClass} onClick={this.props.toggleMenuBar}></div>
			</div>
			
			
		);
	}
}

export default MenuBar;