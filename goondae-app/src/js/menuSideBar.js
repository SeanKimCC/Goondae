import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MenuBar extends React.Component{
	render(){
		const menuBarClass = "menu-side-bar " + (this.props.isMenuBarOpen ? "menu-side-bar-open" : "");
		const menuScreenClass = "menu-bar-screen " + (this.props.isMenuBarOpen ? "menu-bar-screen-open" : "");
		const menuOverlayScreenClass = "overlay-whole-screen " + (this.props.isMenuBarOpen ? "menu-overlay-screen" : "" );
		const menuBarItemClass = "menu-bar-item";
		return( 
			<div className={menuScreenClass}>
				<div className={menuBarClass}>
					<div id="menuBarTitle" className={menuBarItemClass}><Link to="/" onClick={this.props.updatePageNum} value="">타이틀 모집병과</Link></div>
					<div className={menuBarItemClass}><Link to="/vacation/" onClick={this.props.updatePageNum} value="vacation">휴가표</Link></div>
					<div className={menuBarItemClass}><Link to="/meal/" onClick={this.props.updatePageNum} value="meal">식단표</Link></div>
					<div className={menuBarItemClass}><Link to="/futureMe/" onClick={this.props.updatePageNum} value="futureMe">미래의 나에게</Link></div>					
					<div className={menuBarItemClass}><Link to="/calculator/" onClick={this.props.updatePageNum} value="calculator">복무/월급 계산기</Link></div>
					<div className={menuBarItemClass}><Link to="/openBoard/" onClick={this.props.updatePageNum} value="openBoard">자유게시판</Link></div>
				</div>
				<div className={menuOverlayScreenClass} onClick={this.props.toggleMenuBar}></div>
			</div>
			
			
		);
	}
}

export default MenuBar;