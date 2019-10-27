import React from 'react';
import ReactDOM from 'react-dom';
import '../css/locked-page.css';

class LockedPage extends React.Component{
	render(){
		return(
			<div className="locked-page-container" onClick={this.props.openLoginModal}>
				<div className="locked-page">
					<i class="fas fa-lock lock-icon"></i>
				</div>	
			</div>
			
		);
	}
}
export default LockedPage;
